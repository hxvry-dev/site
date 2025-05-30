import { GameStateV2, Upgrade, UserUpgrade } from '@/components/custom/game/schema';
import { Tables } from './api';
import { supabase } from '@/components/custom/game/components/IncrementalV2';

export const getUserID = async (): Promise<string | undefined> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (user) {
		return user.id;
	}
};

export const userUpgrades = async (): Promise<Tables<'user_upgrades'>[] | undefined> => {
	const userID = await getUserID();
	if (!userID) return;
	const { data, error } = await supabase.from('user_upgrades').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your upgrades... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded User Upgrades from DB!');
		return data as Tables<'user_upgrades'>[];
	}
	return [];
};

export const loadUserFromDB = async (): Promise<Tables<'users'> | undefined> => {
	const userID = await getUserID();
	if (!userID) return;
	console.log(userID);
	const { data, error } = await supabase.from('users').select('*').eq('user_id', userID).single();
	if (error) {
		console.error(`There was a problem grabbing your Game State... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded User from DB!');
		return data as Tables<'users'>;
	}
	return data;
};

export const getUpgradesFromDB = async (): Promise<Tables<'upgrades'>[] | undefined> => {
	await supabase.auth.getUser().then(async ({ data: { user } }) => {
		if (!user) return;
	});
	const { data, error } = await supabase.from('upgrades').select('*');
	if (error) {
		console.error(`There was a problem grabbing the upgrades... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded Upgrades from DB!');
		return data as Tables<'upgrades'>[];
	}
	return [];
};

export const fetchAndValidateGameState = async (): Promise<GameStateV2 | undefined> => {
	const userID = await getUserID();
	if (!userID) return;
	try {
		const { data: gameUpgrades, error: upgradesError } = await supabase.from('upgrades').select('*');
		if (upgradesError) throw upgradesError;

		const { data: userUpgrades, error: userUpgradesError } = await supabase
			.from('user_upgrades')
			.select('*')
			.eq('user_id', userID);
		if (userUpgradesError) throw userUpgradesError;

		const { data: users, error: usersError } = await supabase
			.from('users')
			.select('*')
			.eq('user_id', userID)
			.single();
		if (usersError) throw usersError;

		const gameStateV2: GameStateV2 = {
			user: users,
			userUpgrades: userUpgrades,
			upgrades: gameUpgrades,
		};

		const validated = GameStateV2.safeParse(gameStateV2);
		if (validated.success) {
			return gameStateV2;
		}
	} catch (error) {
		console.error(`An error occurred. Please try again later. \nError: ${JSON.stringify(error)}`);
	}
};

export const syncGameState = async (gameState: GameStateV2): Promise<GameStateV2 | undefined> => {
	const userID = await getUserID();
	if (!userID) return;
	try {
		if (!userID) return;
		const { data: userInfoData, error: userInfoError } = await supabase
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
			const { data: gameStateData, error: gameStateError } = await supabase.from('user_upgrades').upsert({
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

export const calculateLevel = async (upgradeID: string): Promise<number | null> => {
	try {
		const { data, error } = await supabase
			.from('user_upgrades')
			.select('max(level_current)')
			.eq('upgrade_id', upgradeID)
			.single();
		if (error) {
			console.error(`Error fetching user upgrades: ${error.code}`, error.message);
			return null;
		}
		const maxLevel = data.max.map((upgrade) => parseInt(upgrade.level_current))[0];
		return maxLevel || null;
	} catch (error) {
		console.error('An unexpected error occurred:', error);
		return null;
	}
};

export const upsertUserUpgrade = async (upgrade: Upgrade, gameState: GameStateV2) => {
	const userID: string | undefined = await getUserID();
	if (!userID) return;
	return await supabase.from('user_upgrades').upsert({
		level_current: await calculateLevel(upgrade.upgrade_id),
		prestige_num: gameState.user.num_times_prestiged,
		upgrade_id: upgrade.upgrade_id,
		user_id: userID,
	});
};

export const purchaseUserUpgrade = async (upgrade: Upgrade, gameState: GameStateV2) => {
	let result: Array<UserUpgrade> = [];
	const userID = await getUserID();
	const levels = gameState.userUpgrades
		.filter((u) => u.user_id === userID && u.upgrade_id === upgrade.upgrade_id)
		.map((u) => u.level_current);
	const current_level = Math.max(...levels);

	result.push({
		level_current: current_level,
		prestige_num: gameState.user.num_times_prestiged,
		upgrade_id: upgrade.upgrade_id,
		user_id: userID!,
	});

	return result;
};
