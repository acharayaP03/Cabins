import { getToday } from '../utils/helpers';
import supabase from './supabase';

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

export async function getAllBookings() {
	const { data: allBookings, error } = await supabase
		.from('bookings')
		.select(
			'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)',
		);

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	return allBookings;
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
