import { Heading } from '@/ui/Common';
import { Row } from '@/ui/Grid';
import UpdateSettingsForm from '@/features/settings/UpdateSettingsForm.jsx';

function Settings() {
	return (
		<Row>
			<Heading as='h1'>Update hotel settings</Heading>
			<UpdateSettingsForm />
		</Row>
	);
}

export default Settings;
