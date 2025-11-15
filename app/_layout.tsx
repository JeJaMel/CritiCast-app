import { Stack } from 'expo-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { PaperProvider } from 'react-native-paper';

import "../global.css";

const queryClient = new QueryClient()

const RootLayout = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default RootLayout