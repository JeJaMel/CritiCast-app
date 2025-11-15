import { useMutation } from '@tanstack/react-query';
import { UpdateUserPayload } from '@/core/auth/interfaces/user';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { updateUserAction } from '@/core/users/actions/update-user.action';
import { deleteUserAction } from '@/core/users/actions/delete-user.action';
import { Alert } from 'react-native';

export const useUpdateUser = () => {
    const updateUserInStore = useAuthStore(state => state.updateUserInStore);

    return useMutation({
        mutationFn: (payload: UpdateUserPayload) => updateUserAction(payload),
        onSuccess: (updatedUser) => {
            updateUserInStore(updatedUser);
            Alert.alert("Profile Updated", "Your profile has been successfully updated.");
        },
        onError: (error) => {
            console.error("Failed to update user:", error);
        }
    });
};

export const useDeleteUser = () => {
    const logout = useAuthStore(state => state.logout);

    return useMutation({
        mutationFn: () => deleteUserAction(),
        onSuccess: () => { logout() },
    });
};