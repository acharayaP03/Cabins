import Heading from '../ui/Common/Heading';
import Row from '../ui/Grid/Row';
import { UpdateUserDataForm } from '../features/authentication';
function Account() {
	return (
		<>
			<Heading as='h1'>Update your account</Heading>

			<Row>
				<Heading as='h3'>Update user data</Heading>
				<UpdateUserDataForm />
			</Row>

			<Row>
				<Heading as='h3'>Update password</Heading>
				<p>Update user password form</p>
			</Row>
		</>
	);
}

export default Account;
