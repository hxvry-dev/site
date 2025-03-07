import supabase from './supabase';

const { data, error } = await supabase().auth.getSession();
export const getDbUserFromSession = data.session?.user;
if (error) {
	console.error('Error grabbing session info', error);
}
