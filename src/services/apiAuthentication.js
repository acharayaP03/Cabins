import { supabaseUrl } from '../appConfig';
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

export async function updateCurrentUser({ fullName, avatar, password }) {
	// update fullName or password
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) {
		console.error(error);
		throw new Error(error.message || 'Update user data failed');
	}
	// if the is no avatar to update, return
	if (!avatar) return data;

	// upload avatar
	const fileName = `avatar-${data.user.id}-${Math.random()}`;
	const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);
	if (storageError) {
		console.error(storageError);
		throw new Error(storageError.message || 'Upload avatar failed');
	}

	// update avatar in the user
	const { data: avatarData, error: avatarError } = await supabase.auth.updateUser({
		data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}` },
	});

	if (avatarError) {
		console.error(avatarError);
		throw new Error(avatarError.message || 'Update avatar failed');
	}

	return avatarData;
}
