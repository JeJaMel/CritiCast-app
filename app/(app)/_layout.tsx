import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import CustomDrawerContent from '@/presentation/shared/components/CustomDrawer';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton';

const DrawerLayout = () => {
    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, 'background');

    useEffect(() => {
        checkStatus();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="blue" size={60} />
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
                headerStyle: { backgroundColor: backgroundColor },
                headerTintColor: '#ECEDEE',
                // headerTitleStyle: { fontFamily: 'Kanit-Bold' },
                drawerStyle: { backgroundColor: backgroundColor },
                drawerActiveTintColor: '#3b82f6',
                drawerInactiveTintColor: 'grey',
                headerShadowVisible: false,
                headerLeftContainerStyle: { paddingLeft: 10 },
                headerRightContainerStyle: { paddingRight: 10 },
            }}
        >
        </Drawer>
    )
};
export default DrawerLayout;