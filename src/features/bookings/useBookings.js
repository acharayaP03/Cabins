import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBookings } from '@/services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { mapDbField } from '@/utils/helpers';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const filterStatus = searchParams.get('status') || 'all';

	/**
	 * inorder for filters to work, we need to pass below object to getAllBookings
	 * @fields {string} - field to filter on
	 * @value {string} - value to filter on
	 * @method {string} - method to filter db query (eq, gte, lte, etc)(default is eq) these are supabase methods
	 */
	const filters =
		!filterStatus || filterStatus === 'all'
			? null
			: { field: 'status', value: filterStatus, method: 'eq' };

	/**
	 * @Sorting
	 * during sorting, we need to map the camelCase field to the db snake_case field name.
	 * @mapDbField is a helper function that does this.
	 */
	const sortByRaw = searchParams.get('sortBy') || 'start_date-desc';
	const [field, order] = sortByRaw.split('-');
	const sortBy = { field: mapDbField(field), order };

	/**
	 * @Pagination filters
	 * @page - page number
	 */
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// Fetching data using useQuery
	const {
		isLoading,
		data: { allBookings: bookings, count } = {}, // given default value to avoid undefined,
		error,
	} = useQuery({
		queryKey: ['bookings', filters, sortBy, page], // adding filters as dependency to refetch when filters change
		queryFn: () => getAllBookings({ filters, sortBy, page }),
	});

	// prefetching data for the next page.
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filters, sortBy, page + 1], // adding filters as dependency to refetch when filters change
			queryFn: () => getAllBookings({ filters, sortBy, page: page + 1 }),
		});
	}

	// Prefetching data for the previous page.
	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filters, sortBy, page - 1],
			queryFn: () => getAllBookings({ filters, sortBy, page: page - 1 }),
		});
	}
	return { isLoading, bookings, error, count };
}
