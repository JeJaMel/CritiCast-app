import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/presentation/shared/components/drawer/CustomDrawer';
import HeaderContent from '@/presentation/shared/components/HeaderContent';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

const DrawerLayout = () => {
    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, 'background');

    useEffect(() => {
        checkStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === 'checking') {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator color="#3b82f6" size={60} />
            </View>
        );
    }

    if (status === 'unauthenticated') {
        return <Redirect href="/auth/login" />;
    }

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerTitle: () => <HeaderContent />,
                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: backgroundColor,
                    height: 88,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: '#ECEDEE',
                drawerStyle: { backgroundColor: '#0f1117' },
                drawerActiveTintColor: '#3b82f6',
                drawerInactiveTintColor: '#9ca3af',
                headerShadowVisible: false,
                headerLeftContainerStyle: { paddingLeft: 10 },
                headerRightContainerStyle: { paddingRight: 10 },
            }}
        >

            <Drawer.Screen
                name="home/index"
                options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen
                name="search/index"
                options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen
                name="movie/[id]"
                options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen
                name="profile/index"
                options={{ drawerItemStyle: { display: 'none' } }}
            />
        </Drawer>


    );
};

export default DrawerLayout;