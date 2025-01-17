import { useForm } from 'react-hook-form';
import { Button } from '@/ui/Buttons';
import { Input, Form, FileInput, Textarea, FormRow } from '@/ui/FormComponent';
import { mapToSnakeCase, spreadPropsToInput } from '@/utils/helpers';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabin = {}, onCloseModal }) {
	const { id: editId, ...editableCabinValues } = mapToSnakeCase(cabin);
	const isCabinBeingEdited = Boolean(editId); // check if the cabin is being edited

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isCabinBeingEdited ? editableCabinValues : {},
	});
	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();
	const { isUpdatingCabin, updateCabin } = useUpdateCabin();
	/**
	 * @description this function is called when there are errors in the form, that has required fields
	 * @param {*} errors
	 * @returns error messages on fields that have errors
	 */
	const onErrors = (errors) => {};

	/**
	 * NOTE: The `handleSubmit` function from react-hook-form is a wrapper around the native form submit event.
	 * It will collect the form data and call the `onSubmit` function with the data.
	 * we need to sanitize the data before sending it to the server, ie some of the keys need to be converted to snake case, suce as
	 * max_capacity, regular_price since these are the keys that the server expects.
	 * hence why on register function we passing sanke case keys for max_capacity, regular_price.
	 */

	const isUserActionInProgress = isCreating || isUpdatingCabin;
	const handleFormSubmit = (data) => {
		const image = typeof data.image === 'string' ? data.image : data.image[0];
		if (isCabinBeingEdited) {
			updateCabin(
				{ updatedCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset(); // reset the form
						onCloseModal?.();
					},
				},
			);
		} else {
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => {
						reset(); // reset the form
						onCloseModal?.();
					},
				},
			);
		}
	};

	return (
		<Form
			onSubmit={handleSubmit(handleFormSubmit, onErrors)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow
				{...spreadPropsToInput({
					label: 'Cabin name',
					error: errors?.name?.message,
				})}
			>
				<Input
					type='text'
					id='name'
					disabled={isUserActionInProgress}
					{...register('name', {
						required: 'Cabin name is required',
						minLength: { value: 3, message: 'Cabin name must be at least 3 characters long' },
					})}
				/>
			</FormRow>

			<FormRow
				{...spreadPropsToInput({
					label: 'Maximum capacity',
					error: errors?.max_capacity?.message,
				})}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isUserActionInProgress}
					{...register('max_capacity', {
						required: 'Maximum capacity is required',
					})}
				/>
			</FormRow>

			<FormRow
				{...spreadPropsToInput({
					label: 'Regular price',
					error: errors?.regular_price?.message,
				})}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isUserActionInProgress}
					{...register('regular_price', {
						required: 'Regular price is required',
						min: { value: 1, message: 'Regular price must be at least 1' },
					})}
				/>
			</FormRow>

			<FormRow
				{...spreadPropsToInput({
					label: 'Discount',
					error: errors?.discount?.message,
				})}
			>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isUserActionInProgress}
					{...register('discount', {
						required: 'Discount is required',
						validate: (value) =>
							Number(value) <= Number(getValues().regular_price) ||
							'Discount must be less than or equal to regular price',
					})}
				/>
			</FormRow>

			<FormRow
				{...spreadPropsToInput({
					label: 'Description for website',
					error: errors?.description?.message,
				})}
			>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isUserActionInProgress}
					{...register('description', {
						required: 'Description is required',
					})}
				/>
			</FormRow>

			<FormRow
				{...spreadPropsToInput({
					label: 'Cabin photo',
				})}
			>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isCabinBeingEdited ? false : 'Image is required',
					})}
				/>
			</FormRow>
			<FormRow>
				{/* just in case if this form is used in any other location, @onCloseModal will create 
				a bug, onCloseModal?.() will help supress that bug if its not passed as props */}
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isCreating}>
					{isCabinBeingEdited ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
