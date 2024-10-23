import { Button } from '@/ui/Buttons';
import { Modal } from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='cabin-form'>
					<Button variation='primary'>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window name='cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
