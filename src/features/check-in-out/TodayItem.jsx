import styled from "styled-components";
import { Flag, Tag } from "../../ui/Common";
import { Button } from "../../ui/Buttons";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

function TodayItem({ activeBooking }) {
    const { id, status, guests, num_nights } = activeBooking;
    return (
        <StyledTodayItem>
            {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
            {status === "checked-in" && <Tag type="blue">Departing</Tag>}
            <Flag src={guests.country_flag} alt={`Flag of ${guests.country}`} />
            <Guest>{guests.full_name}</Guest>
            <div>{num_nights} nights</div>
            {status === "unconfirmed" && (
                <Button
                    size="small"
                    variation="primary"
                    as={Link}
                    to={`/check-in/${id}`}
                >
                    Check in
                </Button>
            )}
            {status === "checked-in" && <CheckoutButton bookingId={id} />}
        </StyledTodayItem>
    );
}

export default TodayItem;
