import { Button } from '@/ui/Buttons';
import { Form, FormRow, Input } from '@/ui/FormComponent';
import { useForm } from 'react-hook-form';
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { register, formState, handleSubmit } = useForm();
	const { errors } = formState;

	function onSubmit(data) {
		console.log(data);
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Full name' error={errors?.fullName?.message}>
				<Input
					type='text'
					id='fullName'
					{...register('fullName', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Email address' error={errors?.email?.message}>
				<Input
					type='email'
					id='email'
					{...register('email', {
						required: 'This field is required',
						pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
					})}
				/>
			</FormRow>

			<FormRow label='Password (min 8 characters)' error={errors?.password?.message}>
				<Input
					type='password'
					id='password'
					{...register('password', {
						required: 'This field is required',
						minLength: { value: 8, message: 'Password must be at least 8 characters' },
					})}
				/>
			</FormRow>

			<FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
				<Input
					type='password'
					id='passwordConfirm'
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (value) => value === getValues().password || 'Passwords do not match',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
