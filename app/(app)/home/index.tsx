import MovieHorizontalList from '@/presentation/Movies/components/MovieHorizontalList';
import { useMovies } from '@/presentation/Movies/hooks/useMovies';
import MainSlideShow from '@/presentation/shared/components/MainSlideShow';
import { ActivityIndicator, ScrollView, View, Text, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const isLoading = nowPlayingQuery.isLoading || popularQuery.isLoading ||
        topRatedQuery.isLoading || upcomingQuery.isLoading;

    useEffect(() => {
        if (!isLoading) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isLoading, fadeAnim, slideAnim]);

    if (isLoading) {
        return (
            <View className='justify-center items-center flex-1 bg-[#0f1117]'>
                <View className='items-center'>
                    <ActivityIndicator color="#3b82f6" size={50} />
                    <Text className='mt-6 text-lg text-white/70 font-semibold'>
                        Loading movies...
                    </Text>
                    <View className='flex-row mt-4 gap-2'>
                        <View className='w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
                        <View className='w-2 h-2 rounded-full bg-blue-400 animate-pulse' style={{ animationDelay: '0.2s' }} />
                        <View className='w-2 h-2 rounded-full bg-blue-300 animate-pulse' style={{ animationDelay: '0.4s' }} />
                    </View>
                </View>
            </View>
        );
    }

    const upcomingMovies = upcomingQuery.data?.pages[0]?.items ?? [];
    const topRatedMovies = topRatedQuery.data?.pages[0]?.items ?? [];
    const popularMovies = popularQuery.data?.pages[0]?.items ?? [];

    return (
        <View className='flex-1 bg-[#0f1117]'>
            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section with Gradient Overlay */}
                <View className='relative'>
                    {/* Main Carousel */}
                    <MainSlideShow movies={nowPlayingQuery.data ?? []} />

                    {/* Gradient Overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(15, 17, 23, 0.2)', '#0f1117']}
                        className='absolute bottom-0 left-0 right-0 h-32'
                        pointerEvents='none'
                    />

                    {/* Top Gradient for Safe Area */}
                    <LinearGradient
                        colors={['rgba(15, 17, 23, 0.5)', 'transparent']}
                        className='absolute top-0 left-0 right-0 h-24'
                        style={{ paddingTop: safeArea.top }}
                        pointerEvents='none'
                    />

                </View>

                {/* Content Section with Animation */}
                <Animated.View
                    className='bg-[#0f1117] pt-6 pb-24'
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    {/* Section Header with Icon */}
                    <View className='px-4 mb-4'>
                        <View className='flex-row items-center mb-2'>
                            <View className='w-1 h-6 bg-blue-500 rounded-full mr-3' />
                            <Text className='text-2xl font-bold text-white'>
                                Trending Now
                            </Text>
                        </View>
                        <Text className='text-sm text-white/60 ml-4'>
                            Most popular movies right now
                        </Text>
                    </View>

                    <MovieHorizontalList
                        movies={popularMovies}
                        loadNextPage={popularQuery.fetchNextPage}
                    />

                    {/* Divider */}
                    <View className='h-px bg-white/5 mx-4 mb-8' />

                    {/* Top Rated Section */}
                    <View className='px-4 mb-4'>
                        <View className='flex-row items-center mb-2'>
                            <Ionicons name="star" size={20} color="#fbbf24" style={{ marginRight: 12 }} />
                            <Text className='text-2xl font-bold text-white'>
                                Top Rated
                            </Text>
                        </View>
                        <Text className='text-sm text-white/60 ml-8'>
                            Highest rated by CritiCast users
                        </Text>
                    </View>

                    <MovieHorizontalList
                        movies={topRatedMovies}
                        loadNextPage={topRatedQuery.fetchNextPage}
                    />

                    {/* Divider */}
                    <View className='h-px bg-white/5 mx-4 mb-8' />

                    {/* Coming Soon Section */}
                    <View className='px-4 mb-4'>
                        <View className='flex-row items-center mb-2'>
                            <Ionicons name="calendar" size={20} color="#3b82f6" style={{ marginRight: 12 }} />
                            <Text className='text-2xl font-bold text-white'>
                                Coming Soon
                            </Text>
                        </View>
                        <Text className='text-sm text-white/60 ml-8'>
                            New releases hitting theaters soon
                        </Text>
                    </View>

                    <MovieHorizontalList
                        movies={upcomingMovies}
                        loadNextPage={upcomingQuery.fetchNextPage}
                        isFetchingNextPage={upcomingQuery.isFetchingNextPage}
                    />

                    {/* Footer Spacing */}
                    <View className='h-8' />
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;