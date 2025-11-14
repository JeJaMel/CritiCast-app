import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import MovieHeader from '@/components/movie/MovieHeader';
import MovieDescription from '@/components/movie/MovieDescription';
import MovieCast from '@/components/movie/MovieCast';
import { useMovie } from '@/hooks/useMovie';

const MovieScreen = () => {

    const { id } = useLocalSearchParams();
    const { movieQuery, castQuery } = useMovie(+id);

    if (movieQuery.isLoading || !movieQuery.data || castQuery.isLoading || !castQuery.data) {
        return (
            <View className='justify-center items-center flex-1 bg-[#222]' >
                <Text className='text-3xl text-green-600 font-bold mb-3'>Loading movie</Text>
                <ActivityIndicator color="green" size={60} />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-[#161722]" >
            <MovieHeader
                poster={movieQuery.data.poster}
                originalTitle={movieQuery.data.originalTitle}
                title={movieQuery.data.title}
            />
            <MovieDescription
                movie={movieQuery.data}
            />

            <MovieCast
                cast={castQuery.data}
            />
        </ScrollView>
    )
}

export default MovieScreen