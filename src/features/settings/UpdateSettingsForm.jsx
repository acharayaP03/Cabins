import { Form, FormRow, Input } from '@/ui/FormComponent';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

import { Spinner } from '@/ui/Common';

function UpdateSettingsForm() {
	const { settings, isLoading } = useSettings();
	const { updateSettings, isUpdatingSettings } = useUpdateSettings();
	if (settings === undefined) return null; // at start, settings is undefined
	const { minimumNights, maximumNights, maximumGuests, breakfastPrice } = settings;
	function handleFieldChange(event, field) {
		const { value } = event.target;

		if (!value) return;
		updateSettings({ [field]: event.target.value });
	}
	if (isLoading) <Spinner />;
	return (
		<Form>
			<FormRow label='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={minimumNights}
					disabled={isUpdatingSettings}
					onBlur={(event) => handleFieldChange(event, 'min_booking_length')}
				/>
			</FormRow>
			<FormRow label='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maximumNights}
					disabled={isUpdatingSettings}
					onBlur={(event) => handleFieldChange(event, 'max_booking_length')}
				/>
			</FormRow>
			<FormRow label='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maximumGuests}
					disabled={isUpdatingSettings}
					onBlur={(event) => handleFieldChange(event, 'max_guest_per_booking')}
				/>
			</FormRow>
			<FormRow label='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
					disabled={isUpdatingSettings}
					onBlur={(event) => handleFieldChange(event, 'breakfast_price')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
