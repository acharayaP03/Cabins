import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { useCabins } from '../../src/features/cabins/useCabins';
import { getCabins } from '../../src/services/apiCabins';

// Clear all mocks before tests
vi.clearAllMocks();

// Mock the API call
vi.mock('../../src/services/apiCabins', () => ({
	getCabins: vi.fn(),
}));

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

describe('useCabins', () => {
	it('should return cabins data transformed correctly', async () => {
		// Mocked cabin data from the API
		const mockCabins = [
			{
				id: 1,
				name: 'Cabin A',
				max_capacity: 4,
				regular_price: 100,
				created_at: '2024-10-21T12:00:00Z',
			},
			{
				id: 2,
				name: 'Cabin B',
				max_capacity: 6,
				regular_price: 150,
				created_at: '2024-10-22T12:00:00Z',
			},
		];

		// Set up the mock to resolve with our mock data
		getCabins.mockResolvedValue(mockCabins);

		const queryClient = createTestQueryClient();

		const { result } = renderHook(() => useCabins(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		// Wait for the query to resolve
		await waitFor(() => expect(result.current.isLoading).toBe(false));

		// Verify the transformed data
		expect(result.current.cabins).toEqual([
			{
				id: 1,
				name: 'Cabin A',
				maxCapacity: 4,
				regularPrice: 100,
				createdAt: '2024-10-21T12:00:00Z',
			},
			{
				id: 2,
				name: 'Cabin B',
				maxCapacity: 6,
				regularPrice: 150,
				createdAt: '2024-10-22T12:00:00Z',
			},
		]);

		// Ensure no errors occurred
		expect(result.current.error).toBeNull();
	});

	it('should handle loading state correctly', () => {
		getCabins.mockImplementation(() => new Promise(() => {})); // Never resolves

		const queryClient = createTestQueryClient();

		const { result } = renderHook(() => useCabins(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		expect(result.current.isLoading).toBe(true);
	});
});
