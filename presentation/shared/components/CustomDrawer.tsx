import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

export default function CustomDrawerContent(props: any) {
    const user = useAuthStore(state => state.user);

    const initials = useMemo(() => {
        const name = user?.username;
        if (!name) return '??';
        return name.trim().slice(0, 2).toUpperCase();
    }, [user?.username,]);

    return (
        <DrawerContentScrollView {...props} scrollEnabled={true}>
            <View className="flex justify-center items-center mx-3 p-10 mb-10 h-[150] rounded-xl bg-primary">
                <View className="flex justify-center items-center bg-white rounded-full h-24 w-24">
                    <Text className="text-primary font-kanit-bold text-3xl">{initials}</Text>
                </View>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}