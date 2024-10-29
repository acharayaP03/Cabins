import supabase from './supabase';

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
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

export async function logout() {}
