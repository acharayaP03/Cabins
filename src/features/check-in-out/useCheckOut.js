import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckOut() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) => {
			return updateBooking(bookingId, { status: 'checked-out' });
		},
		onSuccess: (data) => {
			toast.success(`Booking ${data.id} checked out successfully.`);
			queryClient.invalidateQueries({ active: true });
			navigate('/');
		},
		onError: (error) => {
			toast.error('An error occurred while checking out the booking.');
			console.error(error);
		},
	});

	return {
		checkout,
		isCheckingOut,
	};
}
