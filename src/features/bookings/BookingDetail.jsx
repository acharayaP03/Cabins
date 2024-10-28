import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import { Row } from '@/ui/Grid';
import { Heading, Tag } from '@/ui/Common';
import { ButtonGroup, Button, ButtonText } from '@/ui/Buttons';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Common/Spinner';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
	const { status, id: bookingId } = booking;

	const statusToTagName = {
		'unconfirmed': 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
				{status === 'unconfirmed' && <Button variation='primary'>Check in</Button>}
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
