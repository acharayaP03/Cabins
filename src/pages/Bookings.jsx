import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import BookingTable from '@/features/bookings/BookingTable';
import BookingTableFilters from '../features/bookings/BookingTableFilters';

function Bookings() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All bookings</Heading>
				<BookingTableFilters />
			</Row>
			<Row>
				<BookingTable />
			</Row>
		</>
	);
}

export default Bookings;
