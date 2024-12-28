import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	return (
		<StyledDashboardLayout>
			<div>Statistics</div>
			<div>Today's Activity</div>
			<div>chart stay duration</div>
			<div>Chart sales</div>
		</StyledDashboardLayout>
	);
}
