import { vi, describe, it, afterEach, expect, beforeEach } from 'vitest';
import supabase from '../../src/services/supabase';
import { supabaseUrl } from '../../src/appConfig';
import { getCabins, deleteCabin, createCabin, updateCabin } from '../../src/services/apiCabins';

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

		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: null }),
		});

		const result = await createCabin(newCabin);

		expect(result).toEqual(mockData); // No array wrapping here
		expect(mockInsert).toHaveBeenCalledWith([{ ...newCabin, image: expect.any(String) }]);
		expect(mockSelect).toHaveBeenCalled();
		expect(mockSingle).toHaveBeenCalled();
	});

	it('should throw an error if cabin creation fails', async () => {
		const newCabin = { name: 'Cozy Cabin', image: new File([], 'cabin.jpg') };

		const mockSingle = vi.fn().mockResolvedValueOnce({
			data: null,
			error: { message: 'Cabin could not be created' }, // Proper error structure
		});

		const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
		const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
		supabase.from.mockReturnValueOnce({ insert: mockInsert });

		await expect(createCabin(newCabin)).rejects.toThrow('Cabin could not be created');
	});

	it('should delete the cabin if image upload fails', async () => {
		const newCabin = {
			name: 'Cozy Cabin',
			image: new File(['image content'], 'cabin.jpg', { type: 'image/jpeg' }),
		};

		const mockData = { id: 1, name: 'Cozy Cabin' };
		const mockSingle = vi.fn().mockResolvedValueOnce({ data: mockData, error: null });
		const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
		const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });

		supabase.from.mockReturnValueOnce({ insert: mockInsert });
		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: new Error('Image upload failed') }),
		});

		// Mock delete().eq() chain for cabin deletion
		const mockEq = vi.fn().mockResolvedValueOnce({ data: { id: 1 }, error: null });
		const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });

		supabase.from.mockReturnValueOnce({ delete: mockDelete });

		await expect(createCabin(newCabin)).rejects.toThrow('Cabin image could not be uploaded');
		expect(mockEq).toHaveBeenCalledWith('id', mockData.id);
	});
});
describe('updateCabin', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should update cabin with existing Supabase image path', async () => {
		// Setup the mock chain
		const mockEq = vi.fn();
		const mockUpdate = vi.fn();
		mockUpdate.mockReturnValue({ eq: mockEq });
		supabase.from.mockReturnValue({ update: mockUpdate });
		mockEq.mockResolvedValue({ data: { id: '1' }, error: null });

		const existingImagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/existing-image.jpg`;
		const updatedCabin = {
			id: '1',
			name: 'Cozy Cabin',
			image: existingImagePath,
		};

		const result = await updateCabin(updatedCabin, '1');

		expect(result).toEqual({ id: '1' });
		expect(supabase.from).toHaveBeenCalledWith('cabins');
		expect(mockUpdate).toHaveBeenCalledWith({
			...updatedCabin,
			image: existingImagePath, // Should keep the existing image path
		});
		expect(mockEq).toHaveBeenCalledWith('id', '1');
	});

	it('should generate new image path for non-Supabase URL', async () => {
		// Mock Math.random for consistent image path
		const mockRandom = vi.spyOn(Math, 'random');
		mockRandom.mockReturnValue(0.123456);

		const mockEq = vi.fn();
		const mockUpdate = vi.fn();
		mockUpdate.mockReturnValue({ eq: mockEq });
		supabase.from.mockReturnValue({ update: mockUpdate });
		mockEq.mockResolvedValue({ data: { id: '1' }, error: null });

		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: null }),
		});

		const updatedCabin = {
			id: '1',
			name: 'Cozy Cabin',
			image: 'https://example.com/image.jpg', // Non-Supabase URL
		};

		const result = await updateCabin(updatedCabin, '1');

		expect(result).toEqual({ id: '1' });
		expect(mockUpdate).toHaveBeenCalledWith({
			...updatedCabin,
			image: expect.stringContaining(`${supabaseUrl}/storage/v1/object/public/cabin-images/`),
		});

		mockRandom.mockRestore();
	});

	it('should handle new image file upload', async () => {
		const mockRandom = vi.spyOn(Math, 'random');
		mockRandom.mockReturnValue(0.123456);

		const mockEq = vi.fn();
		const mockUpdate = vi.fn();
		mockUpdate.mockReturnValue({ eq: mockEq });
		supabase.from.mockReturnValue({ update: mockUpdate });
		mockEq.mockResolvedValue({ data: { id: '1' }, error: null });

		supabase.storage.from.mockReturnValue({
			upload: vi.fn().mockResolvedValueOnce({ error: null }),
		});

		const newImage = new File([''], 'test-image.jpg', { type: 'image/jpeg' });
		const updatedCabin = {
			id: '1',
			name: 'Cozy Cabin',
			image: newImage,
		};

		const result = await updateCabin(updatedCabin, '1');

		expect(result).toEqual({ id: '1' });
		expect(mockUpdate).toHaveBeenCalledWith({
			...updatedCabin,
			image: `${supabaseUrl}/storage/v1/object/public/cabin-images/0.123456-test-image.jpg`,
		});

		mockRandom.mockRestore();
	});

	it('should throw error if update fails', async () => {
		const mockEq = vi.fn();
		const mockUpdate = vi.fn();
		mockUpdate.mockReturnValue({ eq: mockEq });
		supabase.from.mockReturnValue({ update: mockUpdate });
		mockEq.mockResolvedValue({
			data: null,
			error: { message: 'Update failed' },
		});

		const updatedCabin = {
			id: '1',
			name: 'Cozy Cabin',
			image: `${supabaseUrl}/storage/v1/object/public/cabin-images/existing-image.jpg`,
		};

		await expect(updateCabin(updatedCabin, '1')).rejects.toThrow('Cabin could not be updated');
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
