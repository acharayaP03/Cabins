import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
		select: (data) =>
			data.map(({ max_capacity, regular_price, created_at, ...rest }) => ({
				...rest,
				maxCapacity: max_capacity,
				regularPrice: regular_price,
				createdAt: created_at,
			})),
	});

	return { isLoading, cabins, error };
}
