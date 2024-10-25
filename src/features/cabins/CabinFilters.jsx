import { useMemo } from 'react';
import { TableOperations } from '@/ui/Tables';
import { Filter, SortBy } from '@/ui/ActionControls';

function CabinFilters() {
	const filterProps = useMemo(
		() => ({
			filterField: 'discount',
			options: [
				{ value: 'all', label: 'All' },
				{ value: 'no-discount', label: 'No Discount' },
				{ value: 'with-discount', label: 'With Discount' },
			],
		}),
		[],
	);
	return (
		<TableOperations>
			<Filter {...filterProps} />
			<SortBy
				options={[
					{ value: 'name-asc', label: 'Sort by name ascending (A -Z)' },
					{ value: 'name-desc', label: 'Sort by name descending (Z - A)' },
					{ value: 'regularPrice-asc', label: 'Sort by price (Low)' },
					{ value: 'regularPrice-desc', label: 'Sort by price (High)' },
					{ value: 'maxCapacity-asc', label: 'Sort by capacity (Low)' },
					{ value: 'maxCapacity-desc', label: 'Sort by capacity (High)' },
				]}
			/>
		</TableOperations>
	);
}

export default CabinFilters;
