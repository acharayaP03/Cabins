import { vi, describe, it, afterEach, expect } from 'vitest';
import supabase from '../../src/services/supabase';
import { getCabins, deleteCabin, createCabin } from '../../src/services/apiCabins';

// Mock the supabase client
vi.mock('../../src/services/supabase', () => ({
	default: {
		from: vi.fn(),
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

	it('should create a new cabin and return the data on success', async () => {
		const newCabin = { name: 'Cozy Cabin', maxCapacity: 4, price: 300 };
		const mockData = [{ id: 1, ...newCabin }];

		// Mock the Supabase insert query
		supabase.from.mockReturnValue({
			insert: vi.fn().mockResolvedValueOnce({ data: mockData, error: null }),
		});

		const result = await createCabin(newCabin);

		expect(result).toEqual(mockData); // Verify the result matches the mock data
		expect(supabase.from).toHaveBeenCalledWith('cabins'); // Verify 'from' was called with 'cabins'
		expect(supabase.from().insert).toHaveBeenCalledWith([newCabin]); // Verify 'insert' was called with the new cabin
	});

	it('should throw an error if the cabin creation fails', async () => {
		const newCabin = { name: 'Cozy Cabin', maxCapacity: 4, price: 300 };

		// Mock a failed insert query
		supabase.from.mockReturnValue({
			insert: vi.fn().mockResolvedValueOnce({
				data: null,
				error: new Error('Cabin could not be created'),
			}),
		});

		await expect(createCabin(newCabin)).rejects.toThrow('Cabin could not be created'); // Verify error is thrown
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
