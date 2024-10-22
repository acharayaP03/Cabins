import { useState } from 'react';
import { Button } from '@/ui/Buttons';
import { Modal } from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
	const [showForm, setShowForm] = useState(false);
	return (
		<div>
			<Button variation='primary' onClick={() => setShowForm((show) => !show)}>
				Add new cabin
			</Button>

			{showForm && (
				<Modal>
					<CreateCabinForm />
				</Modal>
			)}
		</div>
	);
}

export default AddCabin;
