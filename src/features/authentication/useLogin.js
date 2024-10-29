import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
	const navigate = useNavigate();
	const { mutate: login, isLoading: isLogingIn } = useMutation({
		mutationFn: ({ email, password }) => {
			return loginApi({ email, password });
		},
		onSuccess: (user) => {
			console.log('User logged in:', user);
			toast.success('Logged in successfully');
			navigate('/dashboard');
		},
		onError: (error) => {
			console.error(error);
			toast.error('Your email or password is incorrect');
		},
	});

	return { login, isLogingIn };
}
