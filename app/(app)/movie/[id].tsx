import { View, Text, ScrollView, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import MovieHeader from '@/presentation/movie/components/MovieHeader';
import MovieDescription from '@/presentation/movie/components/MovieDescription';
import MovieCast from '@/presentation/movie/components/MovieCast';
import { useMovie } from '@/presentation/movie/hooks/useMovie';
import MovieLoading from '@/presentation/movie/components/MovieLoading';
import { Ionicons } from '@expo/vector-icons';
import GradientDivider from '@/presentation/shared/components/GradientDivider';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import MovieComments from '@/presentation/comments/components/MovieComments';

const MovieScreen = () => {
    const { id } = useLocalSearchParams();
    const { movieQuery, castQuery } = useMovie(+id);

    const movieId = +id;
    const { user } = useAuthStore();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    const isLoading = movieQuery.isLoading || !movieQuery.data || castQuery.isLoading || !castQuery.data;

    useEffect(() => {
        if (!isLoading) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 40,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isLoading, fadeAnim, scaleAnim, slideAnim]);

    if (isLoading) {
        return (
            <MovieLoading />
        );
    }

    return (
        <View className='flex-1 bg-[#0f1117]'>

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [
                            { translateY: slideAnim },
                            { scale: scaleAnim },
                        ],
                    }}
                >
                    {/* Movie Header */}
                    <View className='relative'>
                        <MovieHeader
                            poster={movieQuery.data.poster}
                            originalTitle={movieQuery.data.originalTitle}
                            title={movieQuery.data.title}
                        />

                    </View>

                    {/* Content Container */}
                    <View className='bg-[#0f1117] mt-10'>
                        {/* Movie Description Section */}
                        <View className=' -mt-8 mb-8'>
                            <MovieDescription movie={movieQuery.data} />
                        </View>

                        {/* Divider with Gradient */}
                        <View className='px-4 mb-8'>
                            <GradientDivider colors={['transparent', 'rgba(59, 130, 246, 0.3)', 'transparent']} />
                        </View>

                        {/* Cast Section */}
                        <View className='mb-8'>
                            <View className='px-4 mb-6'>
                                <View className='flex-row items-center mb-2'>
                                    <Ionicons name="people" size={24} color="#3b82f6" style={{ marginRight: 12 }} />
                                    <Text className='text-2xl font-bold text-white'>
                                        Cast & Crew
                                    </Text>
                                </View>
                            </View>

                            <MovieCast cast={castQuery.data} />
                        </View>

                        {/* Bottom Spacing */}
                        <View className='h-12' />
                    </View>

                    <View className='px-4 mb-8'>
                        <GradientDivider colors={['transparent', 'rgba(59, 130, 246, 0.3)', 'transparent']} />
                    </View>

                    <View className='mb-8'>
                        <MovieComments
                            movieId={movieId}
                            currentUserId={user?.id} 
                        />
                    </View>

                    <View className='h-12' />

                </Animated.View>
            </ScrollView>

        </View>
    );
};

export default MovieScreen;