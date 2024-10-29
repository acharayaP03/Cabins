import { getCurrentUser } from '@/services/apiAuhtorization';
import { useQuery } from '@tanstack/react-query';
export function useUser() {
	const { isLoading, data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
