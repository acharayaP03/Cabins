import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedBookings, numberOfDays, cabinCount }) {
	const totalBookings = bookings.length; // total bookings
	const sales = bookings.reduce((acc, booking) => acc + booking.total_price, 0); // total sales
	const checkIns = confirmedBookings.length; // total check ins
	const occupancyRate =
		confirmedBookings.reduce((acc, current) => acc + current.num_nights, 0) /
		(numberOfDays * cabinCount); // occupancy rate

	console.log(confirmedBookings);
	return (
		<>
			<Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={totalBookings} />
			<Stat
				title='Sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns} />
			<Stat
				title='Occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={Math.round(occupancyRate * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
