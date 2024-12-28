import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import { useRecentBookings } from '../features/dashboard/useRecentBookings';
import { useRecentStays } from '../features/dashboard/useRecentStays';
import Heading from '../ui/Common/Heading';
import Row from '../ui/Grid/Row';
import { Spinner } from '../ui/Common';

function Dashboard() {
	const { isLoading: isRecentBookingLoading, recentBookings } = useRecentBookings();
	const { isLoading: isConfirmedLoading, confirmedStays, stays } = useRecentStays();
	if (isRecentBookingLoading || isConfirmedLoading) return <Spinner />;
	console.log(recentBookings);
	console.log(stays);
	console.log(confirmedStays);
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Dashboard</Heading>
				<DashboardFilter />
			</Row>
			<DashboardLayout />
		</>
	);
}

export default Dashboard;
