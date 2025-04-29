import { GameStateV2, tGameStateV2 } from '@/components/custom/game/schema';
import { Tables } from './api';
import supabase from '@/db/supabase';

export const userUpgrades = async (userID: string): Promise<Tables<'user_upgrades'>[]> => {
	const { data, error } = await supabase.from('user_upgrades').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your upgrades... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded User Upgrades from DB!');
		return data as Tables<'user_upgrades'>[];
	}
	return [];
};

export const loadUserFromDB = async (userID: string): Promise<Tables<'users'>[]> => {
	const { data, error } = await supabase.from('users').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your Game State... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded User from DB!');
		return data as Tables<'users'>[];
	}
	return [];
};

export const getUpgradesFromDB = async (): Promise<Tables<'upgrades'>[]> => {
	const { data, error } = await supabase.from('upgrades').select('*');
	if (error) {
		console.error(`There was a problem grabbing the upgrades... Error code: ${error.code}`, error.message);
	} else if (data) {
		console.log('Loaded Upgrades from DB!');
		return data as Tables<'upgrades'>[];
	}
	return [];
};

export const fetchAndValidateGameState = async (userID: string) => {
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

		const gameStateV2: tGameStateV2 = {
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

export const syncGameState = async (userID: string, gameState: tGameStateV2) => {
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
