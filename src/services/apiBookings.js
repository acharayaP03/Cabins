import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '@/utils/constants';

export async function getBooking(id) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, cabins(*), guests(*)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking not found');
	}

	return data;
}

/**
 * @description Get all bookings,
 * if there are filter and sort options, they are passed as arguments.
 * @param {Object} filters
 * @param {Object} sortBy
 * @param {String} filter.methods method to filter db query (eq, gte, lte, etc)
 * @returns
 */

export async function getAllBookings({ filters, sortBy, page }) {
	let query = supabase
		.from('bookings')
		.select(
			'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)',
			{ count: 'exact' },
		);

	// Filter
	if (filters !== null) {
		query = query[filters.method || 'eq'](filters.field, filters.value);
	}

	// Sort
	if (sortBy) {
		query = query.order(sortBy.field, { ascending: sortBy.order === 'asc' });
	}
	const { data: allBookings, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	// pagination
	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
		console.log('query', query);
	}

	return { allBookings, count };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from('bookings')
		.select('created_at, total_price, extras_price')
		.gte('created_at', date)
		.lte('created_at', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from('bookings')
		// .select('*')
		.select('*, guests(full_name)')
		.gte('start_date', date)
		.lte('start_date', getToday());

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, guests(full_name, nationality, country_flag)')
		.or(
			`and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
		)
		.order('created_at');

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from('bookings')
		.update(obj)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be updated');
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Booking could not be deleted');
	}
	return data;
}
