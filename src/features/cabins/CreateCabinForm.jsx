import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '@/services/apiCabins';
import { toast } from 'react-hot-toast';

import { Button } from '@/ui/Buttons';
import { Input, Form, FileInput, Textarea, FormRow } from '@/ui/FormComponent';

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createCabin(newCabin),
		onSuccess: () => {
			toast.success('Cabin successfully added');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});

			reset(); // reset the form
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleFormSubmit = (data) => {
		mutate(data);
	};

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

	const cabinLabelProps = {
		label: 'Cabin name',
		error: errors?.name?.message,
	};

	const capacityLabelProps = {
		label: 'Maximum capacity',
		error: errors?.max_capacity?.message,
	};

	const priceLabelProps = {
		label: 'Regular price',
		error: errors?.regular_price?.message,
	};

	const discountLabelProps = {
		label: 'Discount',
		error: errors?.discount?.message,
	};

	const descriptionLabelProps = {
		label: 'Description for website',
		error: errors?.description?.message,
	};

	const imageLabelProps = {
		label: 'Cabin photo',
	};
	return (
		<Form onSubmit={handleSubmit(handleFormSubmit, onErrors)}>
			<FormRow {...cabinLabelProps}>
				<Input
					type='text'
					id='name'
					disabled={isCreating}
					{...register('name', {
						required: 'Cabin name is required',
						minLength: { value: 3, message: 'Cabin name must be at least 3 characters long' },
					})}
				/>
			</FormRow>

			<FormRow {...capacityLabelProps}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isCreating}
					{...register('max_capacity', {
						required: 'Maximum capacity is required',
					})}
				/>
			</FormRow>

			<FormRow {...priceLabelProps}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isCreating}
					{...register('regular_price', {
						required: 'Regular price is required',
						min: { value: 1, message: 'Regular price must be at least 1' },
					})}
				/>
			</FormRow>

			<FormRow {...discountLabelProps}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isCreating}
					{...register('discount', {
						required: 'Discount is required',
						validate: (value) =>
							Number(value) <= Number(getValues().regular_price) ||
							'Discount must be less than or equal to regular price',
					})}
				/>
			</FormRow>

			<FormRow {...descriptionLabelProps}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isCreating}
					{...register('description', {
						required: 'Description is required',
					})}
				/>
			</FormRow>

			<FormRow {...cabinLabelProps}>
				<FileInput id='image' accept='image/*' />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
