// import MainSlideShow from '@/components/MainSlideShow';
// import MovieHorizontalList from '@/components/Movies/MovieHorizontalList';
// import { useMovies } from '@/hooks/useMovies';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    // const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

    // if (nowPlayingQuery.isLoading) {
    //     return (
    //         <View className='justify-center items-center flex-1 bg-[#222]' >
    //             <ActivityIndicator color="green" size={90} />
    //         </View>
    //     )
    // }
    return (
        <ScrollView className='bg-[#25273c]' >
            <View className='  mt2 bg-[#161722] pb-20 ' style={{ paddingTop: safeArea.top }} >
                <Text className='text-4xl font-bold px-4 mb-1 mt-1 text-neutral-300' >Movie App</Text>

                {/* Images Carousel */}
                {/* <MainSlideShow movies={nowPlayingQuery.data ?? []} /> */}

                {/* <MovieHorizontalList
                    movies={popularQuery.data?.pages.flat() ?? []}
                    title='Popular Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={popularQuery.fetchNextPage}
                /> */}

                {/* <MovieHorizontalList
                    movies={topRatedQuery.data?.pages.flat() ?? []}
                    title='Top Rated Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={topRatedQuery.fetchNextPage}
                /> */}

                {/* <MovieHorizontalList
                    movies={upcomingQuery.data?.pages.flat() ?? []}
                    title='Upcoming Movies'
                    classNameText='text-neutral-300'
                    classNameView='mb-5'
                    loadNextPage={upcomingQuery.fetchNextPage}
                /> */}

            </View>
        </ScrollView>
    )
}

export default HomeScreen