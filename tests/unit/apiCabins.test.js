import { vi, describe, it, afterEach, expect } from 'vitest';
import supabase from '../../src/services/supabase';
import { getCabins, deleteCabin } from '../../src/services/apiCabins';

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
				select: vi.fn().mockResolvedValue({ data: cabins, error: null }),
			});

			const result = await getCabins();

			expect(result).toEqual(cabins);
		});
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
					eq: vi.fn().mockResolvedValue({ data: mockData, error: null }),
				}),
			});

			const result = await deleteCabin(1);

			expect(result).toEqual(mockData); // Verify the cabin is deleted
			expect(supabase.from).toHaveBeenCalledWith('cabins');
		});
	});
});
