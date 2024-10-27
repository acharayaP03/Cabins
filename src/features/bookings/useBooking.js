import { useQuery } from '@tanstack/react-query';
import { getBooking } from '@/services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
	const { bookingId } = useParams();
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: () => getBooking(bookingId),
		retry: false, // Disable retries, by default it's 3 tries, but in this case we don't want to retry because the booking might not exist
	});

	return { isLoading, booking, error };
}
