import { useMemo } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useDeleteUser } from '@/presentation/users/hooks/useUsers';

export default function CustomDrawerContent(props: any) {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    const router = useRouter();

    const deleteAccountMutation = useDeleteUser();


    const initials = useMemo(() => {
        const name = user?.username;
        if (!name) return '??';
        return name.trim().slice(0, 2).toUpperCase();
    }, [user?.username]);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                        props.navigation.closeDrawer();
                    },
                },
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteAccountMutation.mutate(),
                },
            ]
        );
    };

    const handleUpdateProfile = () => {
        props.navigation.closeDrawer();
        router.push('/profile');
    };

    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
            className="bg-[#0f1117]"
        >
            {/* User Profile Section */}
            <LinearGradient
                colors={['#1a1d29', '#0f1117']}
                className="mx-4 mt-4 mb-6 rounded-3xl overflow-hidden"
            >
                <View className="p-6">
                    {/* Avatar */}
                    <View className="items-center mb-4">
                        <View className="relative">
                            <LinearGradient
                                colors={['#3b82f6', '#2563eb']}
                                className="w-24 h-24 rounded-full justify-center items-center"
                                style={{
                                    shadowColor: '#3b82f6',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <Text className="text-white font-bold text-3xl">
                                    {initials}
                                </Text>
                            </LinearGradient>

                            {/* Online Status Indicator */}
                            <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#1a1d29]" />
                        </View>
                    </View>

                    {/* User Info */}
                    <View className="items-center">
                        <Text className="text-white text-xl font-bold mb-1">
                            {user?.username || 'Guest User'}
                        </Text>
                        <Text className="text-white/50 text-sm">
                            {user?.email || 'user@example.com'}
                        </Text>
                    </View>

                </View>
            </LinearGradient>

            {/* Menu Items */}
            <View className="flex-1 px-4">
                {/* Navigation Section */}
                <View className="mb-4">
                    <Text className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3 ml-2">
                        Navigation
                    </Text>

                    <Pressable
                        onPress={() => {
                            props.navigation.closeDrawer();
                            router.push('/home');
                        }}
                        className="flex-row items-center bg-[#1a1d29]/50 rounded-2xl p-4 mb-2 active:bg-[#1a1d29]"
                    >
                        <View className="w-10 h-10 bg-blue-500/20 rounded-full justify-center items-center mr-3">
                            <Ionicons name="home" size={20} color="#3b82f6" />
                        </View>
                        <Text className="text-white font-semibold text-base flex-1">Home</Text>
                        <Ionicons name="chevron-forward" size={20} color="#4b5563" />
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            props.navigation.closeDrawer();
                            router.push('/search');
                        }}
                        className="flex-row items-center bg-[#1a1d29]/50 rounded-2xl p-4 mb-2 active:bg-[#1a1d29]"
                    >
                        <View className="w-10 h-10 bg-purple-500/20 rounded-full justify-center items-center mr-3">
                            <Ionicons name="search" size={20} color="#a855f7" />
                        </View>
                        <Text className="text-white font-semibold text-base flex-1">Explore</Text>
                        <Ionicons name="chevron-forward" size={20} color="#4b5563" />
                    </Pressable>
                </View>

                {/* Account Section */}
                <View className="mb-4">
                    <Text className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3 ml-2">
                        Account
                    </Text>

                    <Pressable
                        onPress={handleUpdateProfile}
                        className="flex-row items-center bg-[#1a1d29]/50 rounded-2xl p-4 mb-2 active:bg-[#1a1d29]"
                    >
                        <View className="w-10 h-10 bg-green-500/20 rounded-full justify-center items-center mr-3">
                            <Ionicons name="person-circle-outline" size={20} color="#22c55e" />
                        </View>
                        <Text className="text-white font-semibold text-base flex-1">Edit Profile</Text>
                        <Ionicons name="chevron-forward" size={20} color="#4b5563" />
                    </Pressable>


                </View>

                {/* Spacer */}
                <View className="flex-1" />

                {/* Danger Zone */}
                <View className="mb-6">
                    <Text className="text-red-400/60 text-xs font-semibold uppercase tracking-wider mb-3 ml-2">
                        Danger Zone
                    </Text>

                    <Pressable
                        onPress={handleLogout}
                        className="flex-row items-center bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20 active:bg-orange-500/20"
                    >
                        <View className="w-10 h-10 bg-orange-500/20 rounded-full justify-center items-center mr-3">
                            <Ionicons name="log-out-outline" size={20} color="#f97316" />
                        </View>
                        <Text className="text-orange-400 font-semibold text-base flex-1">Logout</Text>
                        <Ionicons name="chevron-forward" size={20} color="#f97316" />
                    </Pressable>

                    <Pressable
                        onPress={handleDeleteAccount}
                        className="flex-row items-center bg-red-500/10 rounded-2xl mt-2 p-4 mb-2 border border-red-500/20 active:bg-red-500/20"
                    >
                        <View className="w-10 h-10 bg-red-500/20 rounded-full justify-center items-center mr-3">
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </View>
                        <Text className="text-red-400 font-semibold text-base flex-1">Delete Account</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ef4444" />
                    </Pressable>


                </View>

                {/* App Version */}
                <View className="items-center pb-4">
                    <Text className="text-white/30 text-xs">CritiCast v1.0.0</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}