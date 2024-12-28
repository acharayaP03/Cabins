import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import GlobalStyles from '@/styles/GlobalStyles';
import ProtectedRoute from '@/features/Authorization/ProtectedRoute';
import {
	Dashboard,
	Bookings,
	Cabins,
	Users,
	Settings,
	Account,
	Login,
	PageNotFound,
	Booking,
	Checkin,
} from '@/pages';

import AppLayout from '@/layouts/AppLayout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			staleTime: 1000 * 60,
		},
	},
});

export default function App() {
	return (
		<StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to='dashboard' />} />
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='bookings' element={<Bookings />} />
							<Route path='bookings/:bookingId' element={<Booking />} />
							<Route path='check-in/:bookingId' element={<Checkin />} />
							<Route path='cabins' element={<Cabins />} />
							<Route path='users' element={<Users />} />
							<Route path='settings' element={<Settings />} />
							<Route path='account' element={<Account />} />
						</Route>
						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 3000,
						},
						style: {
							fontSize: '16px',
							padding: '16px 24px',
							maxWidth: '500px',
							backgroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
				/>
			</QueryClientProvider>
		</StyleSheetManager>
	);
}
