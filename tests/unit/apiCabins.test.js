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

	it('should create a cabin successfully', async () => {
		const newCabin = {
			name: 'Cozy Cabin',
			image: new File(['image content'], 'cabin.jpg', { type: 'image/jpeg' }),
		};

		const mockData = { id: 1, name: newCabin.name }; // Mock data as a single object

		// Mock Supabase insert -> select -> single chain
		const mockSingle = vi.fn().mockResolvedValueOnce({ data: mockData, error: null });
		const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
		const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });

		supabase.from.mockReturnValueOnce({ insert: mockInsert });

		// Mock Supabase storage upload
		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: null }),
		});

		// Call the function
		const result = await createCabin(newCabin);

		// Verify the result - Adjust the assertion to match the object structure
		expect(result).toEqual(mockData); // No array wrapping here

		// Verify the chain was called correctly
		expect(mockInsert).toHaveBeenCalledWith([{ ...newCabin, image: expect.any(String) }]);
		expect(mockSelect).toHaveBeenCalled();
		expect(mockSingle).toHaveBeenCalled();
	});

	it('should throw an error if cabin creation fails', async () => {
		const newCabin = { name: 'Cozy Cabin', image: new File([], 'cabin.jpg') };

		// Mock the final single() response with an error
		const mockSingle = vi.fn().mockResolvedValueOnce({
			data: null,
			error: { message: 'Cabin could not be created' }, // Proper error structure
		});

		// Mock the select() method to return the single() spy
		const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });

		// Mock the insert() method to return the select() spy
		const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });

		// Mock the from() method to return the insert() spy
		supabase.from.mockReturnValueOnce({ insert: mockInsert });

		// Call the function and expect it to throw the correct error
		await expect(createCabin(newCabin)).rejects.toThrow('Cabin could not be created');
	});

	it('should delete the cabin if image upload fails', async () => {
		const newCabin = {
			name: 'Cozy Cabin',
			image: new File(['image content'], 'cabin.jpg', { type: 'image/jpeg' }),
		};

		const mockData = { id: 1, name: 'Cozy Cabin' };

		// Mock the single() method to return the final response
		const mockSingle = vi.fn().mockResolvedValueOnce({ data: mockData, error: null });

		// Mock the select() method to return the single() spy
		const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });

		// Mock the insert() method to return the select() spy
		const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });

		// Mock the from() method to return the insert() spy
		supabase.from.mockReturnValueOnce({ insert: mockInsert });

		// Mock the storage upload with an error
		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: new Error('Image upload failed') }),
		});

		// Mock delete().eq() chain for cabin deletion
		const mockEq = vi.fn().mockResolvedValueOnce({ data: { id: 1 }, error: null });
		const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });

		supabase.from.mockReturnValueOnce({ delete: mockDelete });

		// Expect the createCabin function to throw an error
		await expect(createCabin(newCabin)).rejects.toThrow('Cabin image could not be uploaded');

		// Verify that delete().eq() was called with the correct arguments
		expect(mockEq).toHaveBeenCalledWith('id', mockData.id);
	});
});

describe('Update Cabin', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('when cabin is successfully updated', () => {
		it('should return the updated cabin', async () => {});
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
