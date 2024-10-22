import supabase from './supabase';
import { supabaseUrl } from '../appConfig';

export async function getCabins() {
	let { data: cabins, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be loaded');
	}

	return cabins;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll('/', '');
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // image path to be stored in the database

	const { error, data } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}
	// upload image to supabase storage
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// if there is an error uploading the image, delete the cabin, dont create it
	if (storageError) {
		console.log('Cabin deleted', data);
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error('Cabin image could not be uploaded');
	}
	return data;
}

export async function updateCabin(updatedCabin, id) {
	const doesImagePathAlreadyExist =
		typeof updatedCabin.image === 'string' && updatedCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${updatedCabin.image.name}`.replaceAll('/', '');
	const imagePath = doesImagePathAlreadyExist
		? updatedCabin.image // Changed from updateCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	const { error, data } = await supabase
		.from('cabins')
		.update({ ...updatedCabin, image: imagePath })
		.eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be updated');
	}

	return data;
}
export async function deleteCabin(id) {
	let { error, data } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}
