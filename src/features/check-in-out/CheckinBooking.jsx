import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '@/features/bookings/BookingDataBox';
import { Row } from '@/ui/Grid';
import { Heading, Spinner } from '@/ui/Common';
import { Checkbox } from '../../ui/FormComponent';
import { ButtonGroup, Button, ButtonText } from '@/ui/Buttons';

import { useMoveBack } from '@/hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { formatCurrency } from '@/utils/helpers';
import { useCheckin } from './useCheckin';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const { booking, isLoading } = useBooking();
	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	useEffect(() => {
		setConfirmPaid(booking?.is_paid ?? false);
	}, [booking]);

	if (isLoading) return <Spinner />;
	const {
		id: bookingId,
		guests,
		total_price: totalPrice,
		num_guests: numGuests,
		has_breakfast: hasBreakfast,
		num_nights: numNights,
	} = booking;

	function handleCheckin() {
		setConfirmPaid((confirm) => !confirm);
	}

	function handleClick() {
		if (!confirmPaid) return;
		checkin(bookingId);
	}

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			{/* TODO: on confirm check box, it needs to disabled when payment is received when check in is commited. */}
			{/* the query will be refetched and this checkbox will be disabled. at the moment we will live with this bug. */}
			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={handleCheckin}
					id='confirm'
					disabled={confirmPaid || isCheckingIn}
				>
					I confirm that {guests.full_name} has paid the total amount of{' '}
					{formatCurrency(totalPrice)}.
				</Checkbox>
			</Box>
			<ButtonGroup>
				<Button onClick={handleClick} disabled={!confirmPaid}>
					Check in booking #{bookingId}
				</Button>
				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
