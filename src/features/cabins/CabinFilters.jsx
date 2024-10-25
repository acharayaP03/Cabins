import { TableOperations } from '@/ui/Tables';
import { Filter } from '@/ui/ActionMenu';
function CabinFilters() {
	return (
		<TableOperations>
			<Filter
				filterField='discount'
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'no-discount', label: 'No Discount' },
					{ value: 'with-discount', label: 'With Discount' },
				]}
			/>
		</TableOperations>
	);
}

export default CabinFilters;
