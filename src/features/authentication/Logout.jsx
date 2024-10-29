import { ButtonIcon } from '@/ui/Buttons';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';

import { SpinnerMini } from '@/ui/Common';
export default function Logout() {
	const { logout, isLoading } = useLogout();
	return (
		<ButtonIcon onClick={logout} disabled={isLoading}>
			{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}
