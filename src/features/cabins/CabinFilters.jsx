import { TableOperations } from '@/ui/Tables';
import { Filter } from '@/ui/ActionControls';
import { useMemo } from 'react';

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
		</TableOperations>
	);
}

export default CabinFilters;
