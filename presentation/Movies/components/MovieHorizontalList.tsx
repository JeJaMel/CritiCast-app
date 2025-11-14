import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import MoviePoster from './MoviePoster';
import { MoviesUI } from '@/core/movies/interfaces/moviesUI.interface';

interface Props {
    title?: string;
    movies: MoviesUI[];
    classNameView?: string;
    classNameText?: string;
    isFetchingNextPage?: boolean;

    loadNextPage?: () => void;
}

const MovieHorizontalList = ({ title, movies, classNameView, classNameText, loadNextPage, isFetchingNextPage }: Props) => {

    const onEndReached = () => {
        if (isFetchingNextPage) return;

        console.log('Loading next Movies...');
        loadNextPage && loadNextPage();
    };

    return (
        <View className={`${classNameView}`} >
            {title && <Text className={`text-3xl font-bold px-4 mb-2 ${classNameText} `}  >{title}</Text>}

            <FlatList
                horizontal
                data={movies}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MoviePoster id={item.id} poster={item.poster} smallPoster />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                    // El ActivityIndicator ahora se basa en la prop
                    isFetchingNextPage ? (
                        <View style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#999" />
                        </View>
                    ) : <View style={{ width: 20 }} />
                }
            />

        </View>
    )
}

export default MovieHorizontalList