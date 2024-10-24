import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Common/Spinner';
import Table from '@/ui/Tables/Table';
import Menus from '@/ui/ActionMenu/Menus';

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	if (isLoading) return <Spinner />;

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

				<Table.Body data={cabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
			</Table>
		</Menus>
	);
}

export default CabinTable;
