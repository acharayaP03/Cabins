import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '@/services/apiBookings';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }) => {
			updateBooking(bookingId, { status: 'checked-in', is_paid: true, ...breakfast });
		},
		// onSuccess is a callback that will be called when the mutation is successful
		// it will receive the data returned by the mutationFn
		onSuccess: (data) => {
			console.log(data);
			toast.success(`Booking ${data.id} checked in successfully.`);
			queryClient.invalidateQueries({ active: true }); // refetch the active bookings
			navigate('/'); // navigate to the home page once successful
		},
		onError: (error) => {
			toast.error('An error occurred while checking in the booking.');
			console.error(error);
		},
	});

	return { checkin, isCheckingIn };
}
