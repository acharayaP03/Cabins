import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';

export function useSignup() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: (user) => {
			console.log('User signed up successfully', user);
			toast.success('User signed up successfully, please verify your email');
		},
	});

	return { signup, isLoading };
}
