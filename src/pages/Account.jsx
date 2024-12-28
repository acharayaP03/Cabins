import Heading from '../ui/Common/Heading';
import Row from '../ui/Grid/Row';
import { UpdatePasswordForm, UpdateUserDataForm } from '../features/authentication';
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
				<UpdatePasswordForm />
			</Row>
		</>
	);
}

export default Account;
