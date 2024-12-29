import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import styled from "styled-components";
import Stats from "./Stats";
import { Spinner } from "../../ui/Common";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {
    const { isLoading: isRecentBookingLoading, recentBookings } =
        useRecentBookings();
    const {
        isLoading: isConfirmedLoading,
        confirmedStays,
        numberOfDays,
    } = useRecentStays();
    const { cabins, isLoading: isCabinsLoading } = useCabins();

    if (isRecentBookingLoading || isConfirmedLoading || isCabinsLoading)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={recentBookings}
                confirmedBookings={confirmedStays}
                numberOfDays={numberOfDays}
                cabinCount={cabins.length}
            >
                Statistics
            </Stats>
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={recentBookings} numberOfDays={numberOfDays} />
        </StyledDashboardLayout>
    );
}
