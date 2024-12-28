import { logout as logoutApi } from '@/services/apiAuthentication';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSettled: () => {
			queryClient.removeQueries();
			navigate('/login', { replace: true });
		},
		onError: (error) => {
			console.error(error);
			toast.error('Failed to logout');
		},
	});

	return { logout, isLoading };
}
