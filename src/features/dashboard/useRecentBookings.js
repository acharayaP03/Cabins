import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
	const [searchParams] = useSearchParams();
	const numberOfDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7;

	const queryDate = subDays(new Date(), numberOfDays).toISOString();
	const { isLoading, data: recentBookings } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ['bookings', `last-${numberOfDays}`],
	});

	return { isLoading, recentBookings };
}
