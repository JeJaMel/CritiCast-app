import MovieHorizontalList from '@/presentation/Movies/components/MovieHorizontalList';
import { useMovies } from '@/presentation/Movies/hooks/useMovies';
import MainSlideShow from '@/presentation/shared/components/MainSlideShow';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

    if (nowPlayingQuery.isLoading || popularQuery.isLoading || topRatedQuery.isLoading || upcomingQuery.isLoading) {
        return (
            <View className='justify-center items-center flex-1 bg-[#222]' >
                <ActivityIndicator color="green" size={90} />
            </View>
        )
    }

    const upcomingMovies = upcomingQuery.data?.pages[0]?.items ?? [];
    const topRatedMovies = topRatedQuery.data?.pages[0]?.items ?? [];
    const popularMovies = popularQuery.data?.pages[0]?.items ?? [];


    return (
        <ScrollView className='bg-[#25273c]' >
            <View className='  mt2 bg-[#161722] pb-20 ' style={{ paddingTop: safeArea.top }} >

                {/* Images Carousel */}
                <MainSlideShow movies={nowPlayingQuery.data ?? []} />

                <MovieHorizontalList
                    movies={popularMovies}
                    title='Popular Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={popularQuery.fetchNextPage}
                />

                <MovieHorizontalList
                    movies={topRatedMovies}
                    title='Top Rated Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={topRatedQuery.fetchNextPage}
                />

                <MovieHorizontalList
                    movies={upcomingMovies}
                    title='New Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={upcomingQuery.fetchNextPage}
                    isFetchingNextPage={upcomingQuery.isFetchingNextPage}

                />

            </View>
        </ScrollView>
    )
}

export default HomeScreen