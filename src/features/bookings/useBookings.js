import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '@/services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterStatus = searchParams.get('status') || 'all';

	/**
	 * inorder for filters to work, we need to pass below object to getAllBookings
	 * @fields {string} - field to filter on
	 * @value {string} - value to filter on
	 * @method {string} - method to filter db query (eq, gte, lte, etc)(default is eq) these are supabase methods
	 */
	const filters =
		!filterStatus || filterStatus === 'all'
			? null
			: { field: 'status', value: filterStatus, method: 'eq' };
	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings', filters], // adding filters as dependency to refetch when filters change
		queryFn: () => getAllBookings({ filters }),
	});

	return { isLoading, bookings, error };
}
