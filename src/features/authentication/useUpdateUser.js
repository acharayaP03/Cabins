import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User updated successfully");
            // Invalidate the user query to refetch the updated user data
            queryClient.setQueriesData(["user"], user);
            // queryClient.invalidateQueries({
            //     queryKey: ["user"],
            // });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        updateUser,
        isUpdatingUser,
    };
}
