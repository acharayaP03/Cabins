import styled from 'styled-components';
import { LoginForm } from '@/features/authentication';
import { Logo, Heading } from '@/ui/Common';

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--color-grey-50);
`;

export default function Login() {
	return (
		<LoginLayout>
			<Logo />
			<Heading as='h4'>Log in to you account</Heading>
			<LoginForm />
		</LoginLayout>
	);
}
