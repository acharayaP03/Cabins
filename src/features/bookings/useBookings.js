import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '@/services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { mapDbField } from '@/utils/helpers';

export function useBookings() {
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
	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings', filters, sortBy], // adding filters as dependency to refetch when filters change
		queryFn: () => getAllBookings({ filters, sortBy }),
	});

	return { isLoading, bookings, error };
}
