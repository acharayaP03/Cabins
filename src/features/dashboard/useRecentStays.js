import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
	const [searchParams] = useSearchParams();
	const numberOfDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7;

	const queryDate = subDays(new Date(), numberOfDays).toISOString();
	const { isLoading, data: stays } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ['stays', `last-${numberOfDays}`],
	});

	// compute actual stays from bookings
	const confirmedStays = stays?.filter(
		(stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
	);

	return { isLoading, stays, confirmedStays, numberOfDays };
}
