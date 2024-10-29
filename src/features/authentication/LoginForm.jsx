import { useState } from 'react';
import { Button } from '@/ui/Buttons';
import { Form, Input, FormRowVertical } from '@/ui/FormComponent';
import { SpinnerMini } from '@/ui/Common';
import { useLogin } from './useLogin';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLogingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		login({ email, password });
	}

	if (isLogingIn) <SpinnerMini />;
	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label='Email address'>
				<Input
					type='email'
					id='email'
					// This makes this form better for password managers
					autoComplete='username'
					value={email}
					disabled={isLogingIn}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical label='Password'>
				<Input
					type='password'
					id='password'
					autoComplete='current-password'
					value={password}
					disabled={isLogingIn}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size='large' disabled={isLogingIn}>
					{isLogingIn ? <SpinnerMini /> : 'Login'}
				</Button>
			</FormRowVertical>
		</Form>
	);
}
