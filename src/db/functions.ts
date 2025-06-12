import { GameStateV2, Upgrade, Upgrades, User, UserUpgrades } from '@/components/custom/game/schema';
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

export const fetchAndValidateGameState = async (): Promise<GameStateV2> => {
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

		const validated = GameStateV2.safeParse(gameStateV2);
		if (validated.success) {
			console.log('Validated GameStateV2');
			return gameStateV2;
		}
	} catch (error) {
		console.error(`An error occurred. Please try again later. \nError: ${JSON.stringify(error)}`);
	}
	return gameStateV2;
};

export const syncGameState = async (gameState: GameStateV2): Promise<GameStateV2 | undefined> => {
	const userID = await getUserID();
	if (!userID) return;
	try {
		if (!userID) return;
		const { data: userInfoData, error: userInfoError } = await supabase!
			.from('users')
			.update(gameState.user)
			.eq('user_id', userID)
			.select();

		if (userInfoError) {
			throw userInfoError;
		} else {
			console.log(`Synced User's Game info with Supabase! ${userInfoData}`);
		}

		if (gameState.userUpgrades.length < 0) {
			const { data: gameStateData, error: gameStateError } = await supabase!.from('user_upgrades').upsert({
				...gameState.userUpgrades,
			});
			if (gameStateError) {
				throw gameStateError;
			} else {
				console.log(`Synced User's Game State info with Supabase! ${gameStateData}`);
			}
		}
	} catch (error) {
		console.error(`Error syncing with Supabase: ${error}`);
	}
};

export const calculateLocalLevel = (upgrade: Upgrade, gameState: GameStateV2): number => {
	const levels = gameState.userUpgrades
		.filter((u) => u.upgrade_id === upgrade.upgrade_id)
		.map((u) => u.level_current);
	const current_level = Math.max(...levels, 0);
	return current_level;
};

export const upsertUserUpgrades = async (userUpgrades: UserUpgrades): Promise<void> => {
	console.log(userUpgrades);
	await supabase
		.from('user_upgrades')
		.upsert(userUpgrades)
		.then(() => {
			return setTimeout(upsertUserUpgrades, 10000);
		});
};
