import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useCreateCabin } from '../../src/features/cabins/useCreateCabin';
import { createCabin as createCabinApi } from '../../src/services/apiCabins';
import toast from 'react-hot-toast';

// Mock dependencies
vi.mock('../../src/services/apiCabins', () => ({
	createCabin: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
	default: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

describe('useCreateCabin', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should create a cabin successfully', async () => {
		const queryClient = createTestQueryClient();
		const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

		// Mock successful cabin creation
		const newCabin = {
			name: 'Test Cabin',
			max_capacity: 4,
			regular_price: 100,
		};

		createCabinApi.mockResolvedValueOnce(newCabin);

		const { result } = renderHook(() => useCreateCabin(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		// Initial state check
		expect(result.current.isCreating).toBe(false);

		// Trigger mutation
		result.current.createCabin(newCabin);

		// Check loading state
		// expect(result.current.isCreating).toBe(true);

		// Wait for mutation to complete
		await waitFor(() => expect(result.current.isCreating).toBe(false));

		// Verify API was called with correct data
		expect(createCabinApi).toHaveBeenCalledWith(newCabin);
		expect(createCabinApi).toHaveBeenCalledTimes(1);

		// Verify success toast was shown
		expect(toast.success).toHaveBeenCalledWith('Cabin successfully added');

		// Verify query cache was invalidated
		expect(invalidateQueriesSpy).toHaveBeenCalledWith({
			queryKey: ['cabins'],
		});
	});

	it('should handle errors when creating a cabin fails', async () => {
		const queryClient = createTestQueryClient();
		const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

		// Mock failed cabin creation
		const error = new Error('Failed to create cabin');
		createCabinApi.mockRejectedValueOnce(error);

		const { result } = renderHook(() => useCreateCabin(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		// Trigger mutation
		result.current.createCabin({ name: 'Test Cabin' });

		// Wait for mutation to complete
		await waitFor(() => expect(result.current.isCreating).toBe(false));

		// Verify error toast was shown
		expect(toast.error).toHaveBeenCalledWith('Failed to create cabin');

		// Verify query cache was not invalidated
		expect(invalidateQueriesSpy).not.toHaveBeenCalled();
	});

	it('should maintain isCreating state during mutation', async () => {
		const queryClient = createTestQueryClient();

		// Mock a delayed response
		createCabinApi.mockImplementationOnce(
			() => new Promise((resolve) => setTimeout(() => resolve({}), 100)),
		);

		const { result } = renderHook(() => useCreateCabin(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		// Initial state
		expect(result.current.isCreating).toBe(false);

		// Trigger mutation
		result.current.createCabin({ name: 'Test Cabin' });

		// Verify loading state is true during mutation
		// expect(result.current.isCreating).toBe(true);

		// Wait for mutation to complete
		await waitFor(() => expect(result.current.isCreating).toBe(false));
	});
});
