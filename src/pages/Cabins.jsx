import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import CabinTable from '@/features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';

function Cabins() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>Filter/sort</p>
			</Row>
			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;
