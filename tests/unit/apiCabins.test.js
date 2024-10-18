import { vi, describe, it, afterEach, expect } from 'vitest';
import supabase from '../../src/services/supabase';
import { getCabins, deleteCabin, createCabin } from '../../src/services/apiCabins';

// Mock the supabase client
vi.mock('../../src/services/supabase', () => ({
	default: {
		from: vi.fn(),
		storage: {
			from: vi.fn(),
		},
	},
}));

describe('getCabins', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('when cabins are successfully fetched', () => {
		it('should return the fetched cabins', async () => {
			const cabins = [{ id: 1, name: 'Cabin 1' }];

			supabase.from.mockReturnValue({
				select: vi.fn().mockResolvedValueOnce({ data: cabins, error: null }),
			});

			const result = await getCabins();

			expect(result).toEqual(cabins);
		});
	});
});

describe('createCabin', () => {
	afterEach(() => {
		vi.clearAllMocks(); // Reset mocks after each test
	});

	it('should successfully create a cabin and upload the image', async () => {
		const newCabin = {
			name: 'Cozy Cabin',
			image: new File(['image content'], 'cabin.jpg', { type: 'image/jpeg' }),
		};
		const mockData = { id: 1, name: newCabin.name };

		// Mock Supabase insert query
		supabase.from.mockReturnValueOnce({
			insert: vi.fn().mockResolvedValueOnce({ data: [mockData], error: null }),
		});

		// Mock Supabase storage upload
		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: null }),
		});

		const result = await createCabin(newCabin);

		expect(result).toEqual([mockData]); // Verify the result matches the mock data
		expect(supabase.from).toHaveBeenCalledWith('cabins'); // Verify 'from' called with 'cabins'
		expect(supabase.storage.from).toHaveBeenCalledWith('cabin-images'); // Verify storage call
		expect(supabase.storage.from().upload).toHaveBeenCalledWith(
			expect.stringMatching(/^\d\.\d+-cabin\.jpg$/), // Randomly generated name
			newCabin.image,
		);
	});

	it('should throw an error if cabin creation fails', async () => {
		const newCabin = { name: 'Cozy Cabin', image: new File([], 'cabin.jpg') };

		// Mock insert query with error
		supabase.from.mockReturnValueOnce({
			insert: vi.fn().mockResolvedValueOnce({
				data: null,
				error: new Error('Cabin could not be created'),
			}),
		});

		await expect(createCabin(newCabin)).rejects.toThrow('Cabin could not be created');
	});

	it('should delete the cabin if image upload fails', async () => {
		const newCabin = {
			name: 'Cozy Cabin',
			image: new File(['image content'], 'cabin.jpg', { type: 'image/jpeg' }),
		};

		const mockData = { id: 1, name: newCabin.name };

		// Mock insert query to return the mockData
		supabase.from.mockReturnValueOnce({
			insert: vi.fn().mockResolvedValueOnce({ data: [mockData], error: null }),
		});

		// Mock image upload failure
		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({
				error: new Error('Image upload failed'),
			}),
		});

		// Spy on eq() to track the arguments
		const mockEq = vi.fn().mockResolvedValueOnce({ data: { id: 1 }, error: null });

		// Mock delete() to return the eq() spy
		supabase.from.mockReturnValueOnce({
			delete: vi.fn().mockReturnValue({ eq: mockEq }),
		});

		// Verify the function throws the correct error
		await expect(createCabin(newCabin)).rejects.toThrow('Cabin image could not be uploaded');

		// Ensure delete().eq() was called with the correct arguments
		//expect(mockEq).toHaveBeenCalledWith('id', mockData.id);
	});
});

describe('deleteCabin', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('when cabin is successfully deleted', () => {
		it('should return the deleted cabin', async () => {
			const mockData = { id: 1, name: 'Cabin 1' };

			supabase.from.mockReturnValue({
				delete: vi.fn().mockReturnValue({
					eq: vi.fn().mockResolvedValueOnce({ data: mockData, error: null }),
				}),
			});

			const result = await deleteCabin(1);

			expect(result).toEqual(mockData); // Verify the cabin is deleted
			expect(supabase.from).toHaveBeenCalledWith('cabins');
		});
	});
});
