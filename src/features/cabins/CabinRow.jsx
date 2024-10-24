import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatCurrency } from '@/utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { mapToSnakeCase } from '../../utils/helpers';
import { useCreateCabin } from './useCreateCabin';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CreateCabinForm from './CreateCabinForm';
import { Modal } from '@/ui/Modal';
import ConfirmDelete from '../../ui/Modal/ConfirmDelete';
import Table from '../../ui/Tables/Table';

// const TableRow = styled.div`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;
// 	padding: 1.4rem 2.4rem;

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}
// `;

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
				<button disabled={isCreating} onClick={handleDuplicate}>
					<HiSquare2Stack />
				</button>
				<Modal>
					<Modal.Open opens='edit'>
						<button>
							<HiPencil />
						</button>
					</Modal.Open>
					<Modal.Window name='edit'>
						<CreateCabinForm cabin={cabin} />
					</Modal.Window>

					<Modal.Open opens='delete'>
						<button>
							<HiTrash />
						</button>
					</Modal.Open>
					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='cabin'
							disabled={isDeleting}
							onConfirm={() => {
								deleteCabin(id);
							}}
						/>
					</Modal.Window>
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
