import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useMemo, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { UpdateUserPayload } from '@/core/auth/interfaces/user';
import { useUpdateUser } from '@/presentation/users/hooks/useUsers';

const ProfileUpdateScreen = () => {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const updateUserMutation = useUpdateUser();

    const [username, setUsername] = useState(user?.username || '');

    const initials = useMemo(() => {
        if (!username) return '??';
        return username.trim().slice(0, 2).toUpperCase();
    }, [username]);

    const handleUpdateProfile = () => {
        if (!username.trim() || username.trim().length < 3) {
            Alert.alert('Validation Error', 'Username must be at least 3 characters long.');
            return;
        }

        if (username.trim() === user?.username) {
            Alert.alert('No Changes', 'You haven\'t made any changes to your username.');
            return;
        }

        const payload: UpdateUserPayload = {
            username: username.trim(),
        };

        updateUserMutation.mutate(payload, {
            onSuccess: () => {
                router.back();
            }
        });
    };

    const handleCancel = () => {
        if (username !== user?.username) {
            Alert.alert(
                'Discard Changes',
                'Are you sure you want to discard your changes?',
                [
                    { text: 'Keep Editing', style: 'cancel' },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => router.back(),
                    },
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <View className='flex-1 bg-[#0f1117]'>
            <Stack.Screen options={{ headerShown: false }} />

            {/* --- HEADER --- */}
            <LinearGradient
                colors={['#1a1d29', 'rgba(26, 29, 41, 0.95)', 'rgba(26, 29, 41, 0)']}
                className="pt-16 pb-5 px-4"
            >
                <View className='flex-row items-center justify-between mb-4'>
                    <Pressable
                        onPress={handleCancel}
                        className='w-10 h-10 rounded-full bg-white/10 justify-center items-center active:bg-white/20'
                    >
                        <Ionicons name="arrow-back" size={22} color="#ffffff" />
                    </Pressable>
                    <Text className='text-white text-xl font-bold'>Edit Profile</Text>
                    <View className='w-10' />
                </View>

                {/* Avatar */}
                <View className='items-center mb-4'>
                    <View className='relative'>
                        <LinearGradient
                            colors={['#3b82f6', '#2563eb']}
                            className='w-28 h-28 rounded-full justify-center items-center'
                            style={{
                                shadowColor: '#3b82f6',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 8,
                            }}
                        >
                            <Text className='text-white font-bold text-4xl'>{initials}</Text>
                        </LinearGradient>

                        {/* Edit Avatar Button */}
                        <Pressable
                            className='absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full justify-center items-center active:bg-blue-600'
                            style={{
                                shadowColor: '#3b82f6',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        >
                            <Ionicons name="camera" size={20} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView
                className='flex-1 px-4'
                showsVerticalScrollIndicator={false}
            >
                <View className='mb-6'>
                    <View className='flex-row items-center mb-4'>
                        <View className='w-1 h-6 bg-blue-500 rounded-full mr-3' />
                        <Text className='text-white text-lg font-bold'>Account Information</Text>
                    </View>

                    {/* Username Input */}
                    <View className='mb-4'>
                        <Text className='text-white/60 text-sm font-semibold mb-2 ml-1'>Username</Text>
                        <View className='bg-[#1a1d29]/70 rounded-2xl border border-white/10 flex-row items-center px-4'>
                            <Ionicons name="person-outline" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Enter your new username"
                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                className='flex-1 text-white text-base py-4'
                            />
                        </View>
                    </View>

                    {/* Email (NO EDITABLE) */}
                    <View className='mb-4'>
                        <Text className='text-white/60 text-sm font-semibold mb-2 ml-1'>Email</Text>
                        <View className='bg-[#1a1d29]/40 rounded-2xl border border-white/5 flex-row items-center px-4'>
                            <Ionicons name="mail-outline" size={20} color="#6b7280" style={{ marginRight: 12 }} />
                            <Text className='flex-1 text-white/50 text-base py-4'>
                                {user?.email}
                            </Text>
                        </View>
                        <Text className='text-white/40 text-xs mt-2 ml-1'>Your email cannot be changed.</Text>
                    </View>
                </View>

                {/* --- ACCION BUTTONS--- */}
                <View className='mb-8' style={{ gap: 12 }}>
                    <Pressable
                        onPress={handleUpdateProfile}
                        disabled={updateUserMutation.isPending}
                        className='bg-blue-500 rounded-2xl py-4 active:bg-blue-600'
                        style={{ opacity: updateUserMutation.isPending ? 0.7 : 1 }}
                    >
                        {updateUserMutation.isPending ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text className='text-white text-center text-base font-bold'>
                                Save Changes
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={handleCancel}
                        disabled={updateUserMutation.isPending}
                        className='bg-white/5 rounded-2xl py-4 active:bg-white/10'
                    >
                        <Text className='text-white/60 text-center text-base font-semibold'>
                            Cancel
                        </Text>
                    </Pressable>
                </View>

                {/* Bottom Spacing */}
                <View className='h-8' />
            </ScrollView>
        </View>
    );
};

export default ProfileUpdateScreen;