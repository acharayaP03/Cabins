import supabase from './supabase';

export async function getCabins() {
	let { data: cabins, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be loaded');
	}

	return cabins;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
	const imagePath = `${
		import.meta.env.VITE_SUPABAE_URL
	}/storage/v1/object/public/cabin-images/${imageName}`; // image path to be stored in the database

	let { error, data } = await supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);

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
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error('Cabin image could not be uploaded');
	}
	console.log(data);
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
