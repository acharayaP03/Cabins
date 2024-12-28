import { useState } from 'react';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

import { Button } from '@/ui/Buttons';
import { FileInput, Form, FormRow, Input } from '@/ui/FormComponent';

function UpdateUserDataForm() {
	const { updateUser, isUpdatingUser } = useUpdateUser();
	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const {
		user: {
			email,
			user_metadata: { fullName: currentFullName },
		},
	} = useUser();

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;
		updateUser(
			{ fullName, avatar },
			// {
			// 	onSuccess: () => {
			// 		setFullName('');
			// 		setAvatar(null);
			// 		e.target.reset(); // Reset the form
			// 	},
			// },
		);
	}

	// handle cancel to reset the form
	function handleReset() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label='Email address'>
				<Input value={email} disabled />
			</FormRow>
			<FormRow label='Full name'>
				<Input
					disabled={isUpdatingUser}
					type='text'
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					id='fullName'
				/>
			</FormRow>
			<FormRow label='Avatar image'>
				<FileInput id='avatar' accept='image/*' onChange={(e) => setAvatar(e.target.files[0])} />
			</FormRow>
			<FormRow>
				<Button type='reset' variation='secondary' onClick={handleReset}>
					Cancel
				</Button>
				<Button disabled={isUpdatingUser}>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
