import supabase from './supabase';

export async function getCurrentUser() {
	const { data: user } = await supabase.auth.getSession();
	if (!user?.session) return null;

	const { data: userSession, error } = await supabase.auth.getUser();
	if (error) {
		console.error(error);
		throw new Error(error.message || 'User could not get loaded');
	}

	return userSession?.user;
}
