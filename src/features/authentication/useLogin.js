import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuthentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isLoading: isLogingIn } = useMutation({
		mutationFn: ({ email, password }) => {
			return loginApi({ email, password });
		},
		onSuccess: (user) => {
			queryClient.setQueriesData(['user'], user); // update the user query with the new user
			navigate('/dashboard', { replace: true });
		},
		onError: (error) => {
			console.error(error);
			toast.error('Your email or password is incorrect');
		},
	});

	return { login, isLogingIn };
}
