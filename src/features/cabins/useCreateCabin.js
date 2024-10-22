import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin as createCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createCabinApi(newCabin),
		onSuccess: () => {
			toast.success('Cabin successfully added');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { createCabin, isCreating };
}
