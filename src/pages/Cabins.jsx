import { useState } from 'react';
import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import { Button } from '@/ui/Buttons';
import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';

function Cabins() {
	const [showForm, setShowForm] = useState(false);
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>Filter/sort</p>
			</Row>
			<Row>
				<CabinTable />
				<Button variation='primary' onClick={() => setShowForm((show) => !show)}>
					Add new cabin
				</Button>

				{showForm && <CreateCabinForm />}
			</Row>
		</>
	);
}

export default Cabins;
