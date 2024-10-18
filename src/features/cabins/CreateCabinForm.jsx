import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '@/services/apiCabins';
import { toast } from 'react-hot-toast';

import Input from '@/ui/Input';
import Form from '@/ui/Form';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Textarea from '@/ui/Textarea';

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	console.log(errors);
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
	const onErrors = (errors) => console.log(errors);

	/**
	 * NOTE: The `handleSubmit` function from react-hook-form is a wrapper around the native form submit event.
	 * It will collect the form data and call the `onSubmit` function with the data.
	 * we need to sanitize the data before sending it to the server, ie some of the keys need to be converted to snake case, suce as
	 * max_capacity, regular_price since these are the keys that the server expects.
	 * hence why on register function we passing sanke case keys for max_capacity, regular_price.
	 */
	return (
		<Form onSubmit={handleSubmit(handleFormSubmit, onErrors)}>
			<FormRow>
				<Label htmlFor='name'>Cabin name</Label>
				<Input
					type='text'
					id='name'
					{...register('name', {
						required: 'Cabin name is required',
						minLength: { value: 3, message: 'Cabin name must be at least 3 characters long' },
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor='maxCapacity'>Maximum capacity</Label>
				<Input
					type='number'
					id='maxCapacity'
					{...register('max_capacity', {
						required: 'Maximum capacity is required',
					})}
				/>
				{errors?.max_capacity?.message && <Error>{errors.max_capacity.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor='regularPrice'>Regular price</Label>
				<Input
					type='number'
					id='regularPrice'
					{...register('regular_price', {
						required: 'Regular price is required',
						min: { value: 1, message: 'Regular price must be at least 1' },
					})}
				/>
				{errors?.regular_price?.message && <Error>{errors.regular_price.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor='discount'>Discount</Label>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					{...register('discount', {
						required: 'Discount is required',
						validate: (value) =>
							value <= getValues().regular_price ||
							'Discount must be less than or equal to regular price',
					})}
				/>
				{errors?.discount?.message && <Error>{errors.discount.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor='description'>Description for website</Label>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					{...register('description', {
						required: 'Description is required',
					})}
				/>
				{errors?.description?.message && <Error>{errors.description.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor='image'>Cabin photo</Label>
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
