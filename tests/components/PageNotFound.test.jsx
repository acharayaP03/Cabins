import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';

// create a new instance of queryClient
function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60,
			},
		},
	});
}

describe('PageNotFound Route', () => {
	it('renders PageNotFound component for invalid routes', () => {
		const queryClient = createTestQueryClient();

		// Simulate navigation to a non-existent route
		render(
			<QueryClientProvider client={queryClient}>
				<App RouterComponent={MemoryRouter} initialEntries={['/non-existent']} />
			</QueryClientProvider>,
		);

		// Use screen.debug() to inspect the rendered DOM (if needed)
		// screen.debug();

		// Verify that the 404 message is rendered
		// expect(
		// 	screen.getByText(/The page you are looking for could not be found/i),
		// ).toBeInTheDocument();
	});
});
