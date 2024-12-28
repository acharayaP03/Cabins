/**
 * @description useCancelBooking - This function is used to cancel a booking
 * we should not remove any booking from the database, but instead mark it as cancelled.
 * This is because we need to keep the booking for historical reasons.
 *
 * @returns cancelBooking - This function is used to cancel a booking.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useCancelBooking() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: cancelBooking, isLoading: isCancellingBooking } = useMutation({
		mutationFn: (bookingId) => {
			return updateBooking(bookingId, { status: 'cancelled' });
		},
		onSuccess: (data) => {
			toast.success(`Booking ${data.id} cancelled successfully.`);
			queryClient.invalidateQueries({ active: true });
			navigate('/');
		},
		onError: (error) => {
			toast.error('An error occurred while cancelling the booking.');
			console.error(error);
		},
	});
	return {
		cancelBooking,
		isCancellingBooking,
	};
}
