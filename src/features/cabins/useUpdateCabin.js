import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin as updateCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
	const queryClient = useQueryClient();
	const { mutate: updateCabin, isLoading: isUpdatingCabin } = useMutation({
		mutationFn: ({ updatedCabinData, id }) => updateCabinApi(updatedCabinData, id),
		onSuccess: () => {
			toast.success('Cabin successfully updated');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	return { updateCabin, isUpdatingCabin };
}
