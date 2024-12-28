import styled from 'styled-components';
import { useUser } from '@/features/authentication/useUser';
import { Spinner } from '@/ui/Common';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPageSpinner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: var(--color-grey-50);
`;
export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	// 1. load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. if the user is not authenticated, redirect to the login page
	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate('/login');
	}, [isLoading, isAuthenticated, navigate]);

	// 3. while loading, show a loading spinner
	if (isLoading) {
		return (
			<FullPageSpinner>
				<Spinner />
			</FullPageSpinner>
		);
	}
	// 4. if there is user, then render app.
	if (isAuthenticated) return children;
}
