import supabase from './supabase';

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message || 'Login failed');
	}

	console.log('Authenticated user:', data);

	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
		throw new Error(error.message || 'Logout failed');
	}
}
