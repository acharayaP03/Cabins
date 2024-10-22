import { Form, FormRow, Input } from '@/ui/FormComponent';
import { useSettings } from './useSettings';

import { Spinner } from '@/ui/Common';

function UpdateSettingsForm() {
	const { settings, isLoading } = useSettings();

	if (settings === undefined) return null; // at start, settings is undefined
	const { minimumNights, maximumNights, maximumGuests, breakfastPrice } = settings;

	if (isLoading) <Spinner />;
	return (
		<Form>
			<FormRow label='Minimum nights/booking'>
				<Input type='number' id='min-nights' defaultValue={minimumNights} />
			</FormRow>
			<FormRow label='Maximum nights/booking'>
				<Input type='number' id='max-nights' defaultValue={maximumNights} />
			</FormRow>
			<FormRow label='Maximum guests/booking'>
				<Input type='number' id='max-guests' defaultValue={maximumGuests} />
			</FormRow>
			<FormRow label='Breakfast price'>
				<Input type='number' id='breakfast-price' defaultValue={breakfastPrice} />
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
