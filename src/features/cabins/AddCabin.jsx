import { useState } from 'react';
import { Button } from '@/ui/Buttons';
import { Modal } from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				<Button variation='primary' onClick={() => setIsModalOpen(true)}>
					Add new cabin
				</Button>
			</Modal.Open>
			<Modal.Window name='cabin-form'>
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
	// return (
	// 	<div>
	// 		<Button variation='primary' onClick={() => setIsModalOpen((show) => !show)}>
	// 			Add new cabin
	// 		</Button>

	// 		{isModalOpen && (
	// 			<Modal
	// 				onClose={() => {
	// 					setIsModalOpen(false);
	// 				}}
	// 			>
	// 				<CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
	// 			</Modal>
	// 		)}
	// 	</div>
	// );
}

export default AddCabin;
