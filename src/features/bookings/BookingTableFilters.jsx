import { SortBy, Filter } from '@/ui/ActionControls';
import { TableOperations } from '../../ui/Tables';
import { useMemo } from 'react';

export default function BookingTableFilters() {
	const bookingFilterProps = useMemo(
		() => ({
			filterField: 'status',
			options: [
				{ value: 'all', label: 'All' },
				{ value: 'checked-out', label: 'Checked out' },
				{ value: 'checked-in', label: 'Checked in' },
				{ value: 'unconfirmed', label: 'Unconfirmed' },
			],
		}),
		[],
	);

	const bookingSortByProps = useMemo(
		() => [
			{ value: 'startDate-desc', label: 'Sort by date (recent first)' },
			{ value: 'startDate-asc', label: 'Sort by date (earlier first)' },
			{
				value: 'totalPrice-desc',
				label: 'Sort by amount (high first)',
			},
			{ value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
		],
		[],
	);
	return (
		<TableOperations>
			<Filter {...bookingFilterProps} />

			<SortBy options={bookingSortByProps} />
		</TableOperations>
	);
}
