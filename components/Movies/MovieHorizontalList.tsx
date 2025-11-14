import { Movie } from '@/infraestructures/interfaces/movie.interface'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import MoviePoster from './MoviePoster'
import { useEffect, useRef, useState } from 'react';

interface Props {
    title?: string;
    movies: Movie[];
    classNameView?: string;
    classNameText?: string;

    loadNextPage?: () => void;
}

const MovieHorizontalList = ({ title, movies, classNameView, classNameText, loadNextPage }: Props) => {

    const isLoading = useRef(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setTimeout(() => {
        isLoading.current = false
        setLoading(false);
        // }, 200)
    }, [movies])

    const onEndReached = () => {
        if (isLoading.current) return;
        isLoading.current = true;
        setLoading(true);
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
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={({ item }) => <MoviePoster id={item.id} poster={item.poster} smallPoster />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                    loading ? (
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