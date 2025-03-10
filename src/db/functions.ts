import { Session } from '@supabase/supabase-js';
import supabase from './supabase';
/**
 * Assumes you're already signed in.
 * @returns The user ID
 */
export const noAuthGetUserId = () => {
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key && key.startsWith('sb-')) {
			const session: Session = JSON.parse(localStorage.getItem(key)!);
			if (session) {
				return session.user.id;
			}
		}
	}
};

export const userUpgrades = async (userID: string) => {
	const { data, error } = await supabase().from('user_upgrades').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
		return data;
	}
};

export const loadUserGameStateFromDB = async (userID: string) => {
	const { data, error } = await supabase().from('users').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your Game State... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
		return data;
	}
};

export const getUpgradesFromDB = async () => {
	const { data, error } = await supabase().from('upgrades').select('*');
	if (error) {
		console.error(`There was a problem grabbing the upgrades... Error code: ${error.code}`, error.message);
	} else {
		for (const upgrade of data) {
			console.log(upgrade);
		}
	}
};

export const getBaseUpgradesFromDB = async () => {
	const { data, error } = await supabase().from('upgrades').select('*').eq('upgrade_type', 'base');
	if (error) {
		console.error(`There was a problem grabbing base upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
		return data;
	}
};

export const getPrestigeUpgradesFromDB = async () => {
	const { data, error } = await supabase().from('upgrades').select('*').eq('upgrade_type', 'prestige');
	if (error) {
		console.error(`There was a problem grabbing prestige upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
		return data;
	}
};

/*
export const onUpgradeAddToUserUpgrades = async (upgrade: something, userID: string) => {
	const { data, error } = await supabase()
		.from('user_upgrades')
		.insert([
			{
				user_id: userID,
				upgrade_id: upgrade.id,
				level_current: upgrade.level.current,
				purchased_at: new Date().toISOString(),
			},
		]);

	if (error) {
		console.error('Error adding user upgrade:', error);
	} else {
		console.log('User upgrade added successfully:', data);
		return data;
	}
};
*/
