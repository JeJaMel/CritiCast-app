import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, ActivityIndicator, Text, Animated, Pressable } from 'react-native';
import { useFilteredMovies } from '@/presentation/Movies/hooks/useFilteredMovies';
import { MovieFilters } from '@/core/movies/interfaces/filters.interface';
import MovieVerticalList from '@/presentation/Movies/components/MovieVerticalList';
import { useMemo, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type SearchParams = {
    sortBy?: 'tmdb_rating' | 'release_date' | 'user_rating' | 'title';
    tmdbRatingFrom?: string;
    genres?: string;
    search?: string;
};

const SearchResultsScreen = () => {
    const params = useLocalSearchParams<SearchParams>();
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const filters = useMemo((): MovieFilters => {
        return {
            ...params,
            tmdbRatingFrom: params.tmdbRatingFrom
                ? parseInt(params.tmdbRatingFrom, 10)
                : undefined,
        };
    }, [params]);

    const { filteredMoviesQuery } = useFilteredMovies(filters);

    const movies = filteredMoviesQuery.data?.pages.map(page => page.items).flat() ?? [];

    // Entrance animation
    useEffect(() => {
        if (!filteredMoviesQuery.isLoading) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start();
        }

    }, [filteredMoviesQuery.isLoading, fadeAnim, scaleAnim]);

    // Parse active filters for display
    const activeFilters = useMemo(() => {
        const filters = [];
        if (params.search) filters.push({ type: 'search', value: params.search });
        if (params.genres) filters.push({ type: 'genre', value: params.genres });
        if (params.tmdbRatingFrom) filters.push({ type: 'rating', value: `${params.tmdbRatingFrom}+` });
        if (params.sortBy) {
            const sortLabels = {
                tmdb_rating: 'Rating',
                release_date: 'Release Date',
                user_rating: 'User Rating',
                title: 'Title'
            };
            filters.push({ type: 'sort', value: sortLabels[params.sortBy] });
        }
        return filters;
    }, [params]);

    const getHeaderTitle = () => {
        if (params.search) return `"${params.search}"`;
        if (params.genres) return params.genres;
        return 'Search Results';
    };

    return (
        <View className="flex-1 bg-[#0f1117]">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* Custom Header with Gradient */}
            <LinearGradient
                colors={['#1a1d29', 'rgba(26, 29, 41, 0.95)', 'rgba(26, 29, 41, 0)']}
                className="pt-16 pb-5 px-4"
            >
                {/* Home Button */}
                <Pressable
                    onPress={() => router.push('/home')}
                    className="absolute top-14 right-4 w-10 h-10 rounded-full bg-white/10 justify-center items-center active:bg-white/20"
                >
                    <Ionicons name="arrow-back-outline" size={20} color="#ffffff" />
                </Pressable>

                <View className="mb-4">
                    <Text className="text-sm text-white/60 mb-1 tracking-wider uppercase">
                        Results for
                    </Text>
                    <Text className="text-[32px] font-bold text-white mb-2" numberOfLines={1}>
                        {getHeaderTitle()}
                    </Text>
                    <Text className="text-base text-blue-500 font-semibold">
                        {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
                    </Text>
                </View>

                {/* Active Filters Pills */}
                {activeFilters.length > 0 && (
                    <View className="flex-row flex-wrap gap-2">
                        {activeFilters.map((filter, index) => (
                            <View
                                key={index}
                                className="flex-row items-center bg-blue-500/15 px-3 py-1.5 rounded-2xl border border-blue-500/30"
                            >
                                <Ionicons
                                    name={
                                        filter.type === 'search' ? 'search' :
                                            filter.type === 'genre' ? 'film' :
                                                filter.type === 'rating' ? 'star' :
                                                    'swap-vertical'
                                    }
                                    size={14}
                                    color="#3b82f6"
                                    style={{ marginRight: 6 }}
                                />
                                <Text className="text-blue-500 text-[13px] font-semibold">
                                    {filter.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </LinearGradient>

            {filteredMoviesQuery.isLoading ? (
                <View className="flex-1 justify-center items-center px-8">
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text className="mt-4 text-base text-white/70">Searching movies...</Text>
                </View>
            ) : movies.length === 0 ? (
                <Animated.View
                    className="flex-1 justify-center items-center px-8"
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                >
                    <View className="w-[120px] h-[120px] rounded-full bg-white/5 justify-center items-center mb-6">
                        <Ionicons name="film-outline" size={64} color="rgba(255, 255, 255, 0.2)" />
                    </View>
                    <Text className="text-2xl font-bold text-white mb-2">No movies found</Text>
                    <Text className="text-base text-white/60 text-center leading-[22px]">
                        Try adjusting your filters or search term
                    </Text>
                </Animated.View>
            ) : (
                <Animated.View
                    className="flex-1"
                    style={{ opacity: fadeAnim }}
                >
                    <MovieVerticalList
                        movies={movies}
                        loadNextPage={filteredMoviesQuery.fetchNextPage}
                        isFetchingNextPage={filteredMoviesQuery.isFetchingNextPage}
                        classNameView="flex-1"
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default SearchResultsScreen;