import { Session } from '@supabase/supabase-js';
import supabase from './supabase';

const noAuthGetUserId = () => {
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key && key.startsWith('sb-')) {
			const session: Session = JSON.parse(localStorage.getItem(key)!);
			return session.user.id;
		}
	}
};

export const userUpgrades = async () => {
	const userID = noAuthGetUserId();
	const { data, error } = await supabase().from('user_upgrades').select('*').eq('user_id', userID);
	if (error) {
		console.error(`There was a problem grabbing your upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
	}
};

export const getUpgradesFromDB = async () => {
	const { data, error } = await supabase().from('upgrades').select('*');
	if (error) {
		console.error(`There was a problem grabbing the upgrades... Error code: ${error.code}`, error.message);
	} else {
		console.log(data);
	}
};
