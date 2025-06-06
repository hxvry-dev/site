import { GameStateV2, Upgrade, UserUpgrade } from '@/components/custom/game/schema';
import { supabase } from '@/components/custom/game/components/IncrementalV2';

export const getUserID = async (): Promise<string | undefined> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (user) {
		sessionStorage.setItem('user_id', user.id);
		sessionStorage.setItem('user_gotten', 'true');
		return user.id;
	}
};

export const fetchAndValidateGameState = async (): Promise<GameStateV2 | undefined> => {
	const userID =
		sessionStorage.getItem('user_gotten') === 'true' ? sessionStorage.getItem('user_id') : await getUserID();
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
			console.log('Validated GameStateV2');
			return gameStateV2;
		}
	} catch (error) {
		console.error(`An error occurred. Please try again later. \nError: ${JSON.stringify(error)}`);
	}
};

export const syncGameState = async (gameState: GameStateV2): Promise<GameStateV2 | undefined> => {
	const userID =
		sessionStorage.getItem('user_gotten') === 'true' ? sessionStorage.getItem('user_id') : await getUserID();
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

export const calculateLocalLevel = (upgrade: Upgrade, gameState: GameStateV2): number => {
	const levels = gameState.userUpgrades
		.filter((u) => u.upgrade_id === upgrade.upgrade_id)
		.map((u) => u.level_current);
	const current_level = Math.max(...levels, 0);
	return current_level;
};

export const upsertUserUpgrade = async (upgrade: Upgrade, gameState: GameStateV2) => {
	const userID =
		sessionStorage.getItem('user_gotten') === 'true' ? sessionStorage.getItem('user_id') : await getUserID();
	if (!userID) return;
	return await supabase.from('user_upgrades').upsert({
		level_current: calculateLocalLevel(upgrade, gameState),
		prestige_num: gameState.user.num_times_prestiged,
		upgrade_id: upgrade.upgrade_id,
		user_id: userID,
	});
};

export const purchaseUserUpgrade = async (upgrade: Upgrade, gameState: GameStateV2) => {
	let result: Array<UserUpgrade> = [];
	const userID =
		sessionStorage.getItem('user_gotten') === 'true' ? sessionStorage.getItem('user_id') : await getUserID();
	const current_level: number = calculateLocalLevel(upgrade, gameState);

	result.push({
		level_current: current_level,
		prestige_num: gameState.user.num_times_prestiged,
		upgrade_id: upgrade.upgrade_id,
		user_id: userID!,
	});

	console.log(result);
	return result;
};
