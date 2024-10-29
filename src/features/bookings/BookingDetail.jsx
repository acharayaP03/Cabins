import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Row } from '@/ui/Grid';
import { Heading, Tag } from '@/ui/Common';
import { ButtonGroup, Button, ButtonText } from '@/ui/Buttons';
import Spinner from '@/ui/Common/Spinner';
import BookingDataBox from './BookingDataBox';

import { useMoveBack } from '@/hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckOut } from '../check-in-out/useCheckOut';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const { checkout, isCheckingOut } = useCheckOut();
	const moveBack = useMoveBack();
	const navigate = useNavigate();

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
				{status === 'unconfirmed' && (
					<Button variation='primary' onClick={() => navigate(`/check-in/${bookingId}`)}>
						Check in
					</Button>
				)}
				{status === 'checked-in' && (
					<Button
						variation='primary'
						onClick={() => {
							checkout(bookingId);
						}}
						disabled={isCheckingOut}
					>
						Check out
					</Button>
				)}
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
