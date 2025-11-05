// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import "../global.css";

// const queryClient = new QueryClient()


export default function RootLayout() {
  // const backgroundColor = useThemeColor({}, 'background')

  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      {/* <QueryClientProvider client={queryClient}> */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>
      <StatusBar style="auto" />
      {/* </QueryClientProvider> */}
    </GestureHandlerRootView>
  );
}
