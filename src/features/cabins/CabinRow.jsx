import styled from 'styled-components';
import PropTypes from 'prop-types';

import { formatCurrency, mapToSnakeCase } from '@/utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CreateCabinForm from './CreateCabinForm';
import { Modal } from '@/ui/Modal';
import ConfirmDelete from '@/ui/Modal/ConfirmDelete';
import Table from '@/ui/Tables/Table';
import { Menus } from '@/ui/ActionControls';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
	const { deleteCabin, isDeleting } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	function handleDuplicate() {
		const transformedDTOForEdit = mapToSnakeCase({
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
		createCabin({
			name: `Copy of ${name}`,
			...transformedDTOForEdit,
		});
	}

	return (
		<Table.Row>
			<Img src={image} alt='' />
			<Cabin role='cell'>{name}</Cabin>
			<div role='cell'>Fits up to {maxCapacity}</div>
			<Price role='cell'>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount role='cell'>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					{/* The Menu component is a compound component that manages the state of the dropdown */}
					{/* here things are really messy and confusing, i really dont like this */}
					<Menus.Menu>
						<Menus.Toggle id={id} />
						{/* if you are wondering how we have Model.Open component inside Menus.List then here are the explanation. */}
						{/* List from menu takes a children props as in Modal.open when then receives another children props, whih is menus.button, hence why this layout was possible */}
						{/* if you are too confused, take a look at Menus.List and Modal.Open component, hope that makes sense. */}
						<Menus.List id={id}>
							<Modal.Open opens='edit'>
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>
							<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>
							<Modal.Open opens='delete'>
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='edit'>
							<CreateCabinForm cabin={cabin} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='cabin'
								disabled={isDeleting}
								onConfirm={() => {
									deleteCabin(id);
								}}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

CabinRow.propTypes = {
	cabin: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		maxCapacity: PropTypes.number.isRequired,
		regularPrice: PropTypes.number.isRequired,
		discount: PropTypes.number.isRequired,
		image: PropTypes.string,
	}).isRequired,
};

export default CabinRow;
