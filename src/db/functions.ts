import { GameState, UserUpgrades, Upgrades, Upgrade, User } from '@/components/custom/game/components/util/schema';
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

export const fetchAndValidateGameState = async (): Promise<GameState | undefined> => {
	const userID = await getUserID();
	let gameState: GameState = {} as GameState;
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

		gameState = {
			user: users as User,
			userUpgrades: userUpgrades as UserUpgrades,
			upgrades: gameUpgrades as Upgrades,
		};
	} catch (error) {
		console.error(`An error occurred. Please try again later. \nError: ${JSON.stringify(error)}`);
	}

	const validated = GameState.safeParse(gameState);
	if (validated.success) {
		return gameState;
	}
};

export const calculateLocalLevel = (upgrade: Upgrade, gameState: GameState): number => {
	const levels = gameState.userUpgrades
		.filter((u) => u.upgrade_id === upgrade.upgrade_id)
		.filter((u) => u.prestige_num == gameState.user.num_times_prestiged || upgrade.upgrade_type === 'prestige')
		.map((u) => u.level_current);
	const current_level = Math.max(...levels, 0);
	return current_level;
};

export const upsertUserUpgrades = async (gameState: GameState): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			const { error: upgradesError } = await supabase
				.from('user_upgrades')
				.upsert(gameState.userUpgrades, { onConflict: 'id' });
			if (upgradesError) {
				console.error('Error upserting user upgrades:', upgradesError);
				throw upgradesError;
			}
			// Update user data
			const { error: userError } = await supabase
				.from('users')
				.update(gameState.user)
				.eq('user_id', gameState.user.user_id);

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
