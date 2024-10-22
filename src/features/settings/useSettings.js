import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
export function useSettings() {
	const {
		isLoading,
		data: settings,
		error,
	} = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
		select: (data) => ({
			minimumNights: data.min_booking_length,
			maximumNights: data.max_booking_length,
			maximumGuests: data.max_guest_per_booking,
			breakfastPrice: data.breakfast_price,
		}),
	});

	return { isLoading, settings, error };
}
