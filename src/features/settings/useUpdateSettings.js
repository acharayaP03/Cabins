import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
	const queryClient = useQueryClient();
	const { mutate: updateSettings, isLoading: isUpdatingSettings } = useMutation({
		mutationFn: (newSetting) => updateSettingApi(newSetting),
		onSuccess: () => {
			toast.success('Settings successfully updated');
			queryClient.invalidateQueries({
				queryKey: ['settings'],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { updateSettings, isUpdatingSettings };
}
