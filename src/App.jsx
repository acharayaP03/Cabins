import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';
import styled from 'styled-components';

const StyledApp = styled.div`
	padding: 2rem;
`;
export default function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row type='horizontal'>
					<Heading type='h1'>React App</Heading>
					<Button variation='primary' size='medium'>
						Click me
					</Button>
				</Row>
				<Row>
					<Heading as='h2'>Welcome to the app</Heading>
					<Heading as='h3'>Sign up</Heading>
					<form>
						<Input type='text' placeholder='Enter your email' />
						<Input type='text' placeholder='Enter your name' />
					</form>
				</Row>
			</StyledApp>
		</>
	);
}
