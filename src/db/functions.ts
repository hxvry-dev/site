import {
	GameStateV2,
	UserUpgrades,
	Upgrades,
	Upgrade,
	User,
} from '@/components/custom/game/components/v2/util/v2-schema';
import { supabase } from '@/db/supabaseClient';

export const getUserID = async (): Promise<string | undefined> => {
	if (sessionStorage.getItem('user_id')) {
		return sessionStorage.getItem('user_id')?.toString();
	}
	const {
		data: { user },
	} = await supabase!.auth.getUser();
	if (user) {
		sessionStorage.setItem('user_id', user.id);
		return user.id;
	}
};

export const fetchAndValidateGameState = async (): Promise<GameStateV2 | undefined> => {
	const userID = await getUserID();
	let gameStateV2: GameStateV2 = {} as GameStateV2;
	try {
		let { data: gameUpgrades, error: upgradesError } = await supabase!.from('upgrades').select('*');
		if (upgradesError) throw upgradesError;

		let { data: userUpgrades, error: userUpgradesError } = await supabase!
			.from('user_upgrades')
			.select('*')
			.eq('user_id', userID);
		if (userUpgradesError) throw userUpgradesError;

		let { data: users, error: usersError } = await supabase!
			.from('users')
			.select('*')
			.eq('user_id', userID)
			.single();
		if (usersError) throw usersError;

		gameStateV2 = {
			user: users as User,
			userUpgrades: userUpgrades as UserUpgrades,
			upgrades: gameUpgrades as Upgrades,
		};
	} catch (error) {
		console.error(`An error occurred. Please try again later. \nError: ${JSON.stringify(error)}`);
	}

	const validated = GameStateV2.safeParse(gameStateV2);
	if (validated.success) {
		return gameStateV2;
	}
};

export const calculateLocalLevel = (upgrade: Upgrade, gameStateV2: GameStateV2): number => {
	const levels = gameStateV2.userUpgrades
		.filter((u) => u.upgrade_id === upgrade.upgrade_id)
		.filter((u) => u.prestige_num == gameStateV2.user.num_times_prestiged || upgrade.upgrade_type === 'prestige')
		.map((u) => u.level_current);
	const current_level = Math.max(...levels, 0);
	return current_level;
};

export const upsertUserUpgrades = async (gameStateV2: GameStateV2): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			const { error: upgradesError } = await supabase
				.from('user_upgrades')
				.upsert(gameStateV2.userUpgrades, { onConflict: 'id' });
			if (upgradesError) {
				console.error('Error upserting user upgrades:', upgradesError);
				throw upgradesError;
			}
			// Update user data
			const { error: userError } = await supabase
				.from('users')
				.update(gameStateV2.user)
				.eq('user_id', gameStateV2.user.user_id);

			if (userError) {
				console.error('Error updating user:', userError);
				throw userError;
			}

			resolve();
		} catch (error) {
			console.error('Auto-save failed:', error);
			reject(error);
		}
	});
};
