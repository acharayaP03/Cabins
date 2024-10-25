import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import CabinTable from '@/features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinFilters from '../features/cabins/CabinFilters';

function Cabins() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<CabinFilters />
			</Row>
			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;
