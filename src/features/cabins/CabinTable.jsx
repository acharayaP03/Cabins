import styled from 'styled-components';
import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Common/Spinner';
import Table from '@/ui/Tables/Table';

// const Table = styled.div`
// 	border: 1px solid var(--color-grey-200);

// 	font-size: 1.4rem;
// 	background-color: var(--color-grey-0);
// 	border-radius: 7px;
// 	overflow: hidden;
// `;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { isLoading, cabins, error } = useCabins();
	if (isLoading) return <Spinner />;

	return (
		<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
			<Table.Header>
				<div role='columnheader'></div>
				<div role='columnheader'>Cabin</div>
				<div role='columnheader'>Capacity</div>
				<div role='columnheader'>Price</div>
				<div role='columnheader'>Discount</div>
				<div></div>
			</Table.Header>

			{cabins.map((cabin) => (
				<CabinRow key={cabin.id} cabin={cabin} />
			))}
		</Table>
	);
}

export default CabinTable;
