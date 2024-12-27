import supabase from './supabase';

export async function signup({ email, password, fullName }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { fullName, avatar: '', role: 'user' },
		},
	});

	if (error) {
		console.error(error);
		throw new Error(error.message || 'Signup failed');
	}
	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message || 'Login failed');
	}
	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
		throw new Error(error.message || 'Logout failed');
	}
}
