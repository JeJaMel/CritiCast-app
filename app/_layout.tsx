// import { nowPlayingAction } from '@/core/actions/movies/now-playing.action';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Stack } from 'expo-router';

import "../global.css";

const queryClient = new QueryClient()

const RootLayout = () => {

  // nowPlayingAction();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>

  )
}

export default RootLayout