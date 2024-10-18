import styled from 'styled-components';
import PropTypes from 'prop-types';

import { formatCurrency } from '@/utils/helpers';
import { deleteCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

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
	const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

	// access queryClient with useQueryClient
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate } = useMutation({
		mutationFn: (id) => deleteCabin(id),
		onSuccess: () => {
			alert('Cabin deleted');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => {
			alert(error.message);
		},
	});
	return (
		<TableRow role='row'>
			<Img src={image} alt='' />
			<Cabin role='cell'>{name}</Cabin>
			<div role='cell'>Fits up to {maxCapacity}</div>
			<Price role='cell'>{formatCurrency(regularPrice)}</Price>
			<Discount role='cell'>{formatCurrency(discount)}</Discount>
			<button onClick={() => mutate(id)} disabled={isDeleting}>
				delete
			</button>
		</TableRow>
	);
}

CabinRow.propTypes = {
	cabin: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		maxCapacity: PropTypes.number.isRequired,
		regularPrice: PropTypes.number.isRequired,
		discount: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
};

export default CabinRow;
