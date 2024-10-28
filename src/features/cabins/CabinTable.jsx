import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Common/Spinner';
import Table from '@/ui/Tables/Table';
import { Menus } from '@/ui/ActionControls';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	/**
	 * 1.) Filter
	 * Get the discount filter from the URL search params.
	 * if not present, default to 'all' else use the value from the URL.
	 */
	const filterDiscount = searchParams.get('discount') || 'all';

	let filteredCabins;
	if (filterDiscount === 'all') filteredCabins = cabins;
	if (filterDiscount === 'with-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
	if (filterDiscount === 'no-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

	// 2.) Sort
	const sortBy = searchParams.get('sortBy') || 'startDate-asc';
	const [field, order] = sortBy.split('-');
	const modifier = order === 'asc' ? 1 : -1; // will help swap the order of the sort, 1 being ascending and -1 being descending
	const sortedCabins = filteredCabins.sort((a, b) => {
		return (a[field] - b[field]) * modifier;
	});

	console.log('Sorted Cabins', sortedCabins);

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div role='columnheader'></div>
					<div role='columnheader'>Cabin</div>
					<div role='columnheader'>Capacity</div>
					<div role='columnheader'>Price</div>
					<div role='columnheader'>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
