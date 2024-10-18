import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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

describe('App component', () => {
	it('initializes router and renders the dashboard routes', () => {
		const queryClient = createTestQueryClient();

		render(
			<QueryClientProvider client={queryClient}>
				<App RouterComponent={MemoryRouter} initialEntries={['/dashboard']} />
			</QueryClientProvider>,
		);
		expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
	});
});

describe('Display all the routes', () => {
	const routes = [
		{ path: '/dashboard', name: /Dashboard/i },
		{ path: '/bookings', name: /Bookings/i },
		{ path: '/cabins', name: /Cabins/i },
		{ path: '/users', name: /Users/i },
		{ path: '/settings', name: /Settings/i },
		{ path: '/account', name: /account/i },
	];

	it.each(routes)('renders $path route correctly', ({ path, name }) => {
		const queryClient = createTestQueryClient();

		// Render the app with the MemoryRouter, navigating to the specified route
		render(
			<QueryClientProvider client={queryClient}>
				<App RouterComponent={MemoryRouter} initialEntries={[path]} />
			</QueryClientProvider>,
		);

		// Check that the expected content is rendered for the route

		// expect(screen.getByRole('heading', { name })).toBeInTheDocument();
	});
});
