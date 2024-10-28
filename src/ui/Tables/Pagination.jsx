import styled from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '@/utils/constants';

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Paragraph = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
	color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

export default function Pagination({ count }) {
	const [searchParams, setSearchParms] = useSearchParams();
	const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
	const pageCount = Math.ceil(count / PAGE_SIZE);

	const showingPageOf = (currentPage - 1) * PAGE_SIZE + 1;
	const showingPageTo = currentPage === pageCount ? count : currentPage * PAGE_SIZE;
	function nextPage() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;
		searchParams.set('page', next);
		setSearchParms(searchParams);
	}

	function previousPage() {
		const previous = currentPage === 1 ? currentPage : currentPage - 1;
		searchParams.set('page', previous);
		setSearchParms(searchParams);
	}

	// do not show pagination when there is only one page
	if (pageCount <= 1) return null;
	return (
		<StyledPagination>
			<Paragraph>
				Showing <span>{showingPageOf}</span> to <span>{showingPageTo}</span> of <span>{count}</span>
			</Paragraph>
			<Buttons>
				<PaginationButton onClick={previousPage} disabled={currentPage === 1}>
					<HiChevronLeft />
					<span>Previous</span>
				</PaginationButton>
				<PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}
