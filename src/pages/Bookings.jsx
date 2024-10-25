import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import BookingTable from '@/features/bookings/BookingTable';

function Bookings() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All bookings</Heading>
			</Row>
			<Row>
				<BookingTable />
			</Row>
		</>
	);
}

export default Bookings;
