import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '@/services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterStatus = searchParams.get('status') || 'all';

	const filters =
		!filterStatus || filterStatus === 'all' ? null : { field: 'status', value: filterStatus };
	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: () => getAllBookings({ filters }),
	});

	return { isLoading, bookings, error };
}
