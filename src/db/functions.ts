import supabase from './supabase';
import { Tables } from './api';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/components/custom/game/atomFactory';
import { DbUpgrade } from '@/components/custom/game/schema';

export const getUserID = async (): Promise<void> => {
	const [_, setUserID] = useAtom(userIdAtom);
	const user = await supabase().auth.getUser();
	if (user) {
		setUserID(user.data.user?.id!);
	}
};

export const userUpgrades = async (userID: string): Promise<Tables<'user_upgrades'>[]> => {
	const { data, error } = await supabase().from('user_upgrades').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log('Loaded User Upgrades from DB!');
		return data as Tables<'user_upgrades'>[];
	}
	return [];
};

export const loadUserFromDB = async (userID: string): Promise<Tables<'users'>[]> => {
	const { data, error } = await supabase().from('users').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your Game State... Error code: ${error.code}`, error.message);
	} else {
		console.log('Loaded User from DB!');
		return data as Tables<'users'>[];
	}
	return [];
};

export const getUpgradesFromDB = async (): Promise<Tables<'upgrades'>[]> => {
	const { data, error } = await supabase().from('upgrades').select('*');
	if (error) {
		console.error(`There was a problem grabbing the upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log('Loaded Upgrades from DB!');
		return data as Tables<'upgrades'>[];
	}
	return [];
};

export const purchaseUserUpgrade = async (
	userID: string,
	upgrade: DbUpgrade,
	upgradeLevel: number,
): Promise<{ data?: null; success: boolean }> => {
	const { data, error } = await supabase()
		.from('user_upgrades')
		.insert([{ user_id: userID, upgrade_id: upgrade.upgrade_id, level_current: upgradeLevel }]);
	if (error) {
		console.error(
			`There was a problem purchasing an upgrade with ID ${upgrade.upgrade_id}... Error code: ${error.code}`,
			error.message,
		);
	} else {
		console.log('Successfully Purchased Upgrade!', data);
		return { data: null, success: true };
	}
	return { success: false };
};
