import { Movie } from "@/sync-movies/src/interfaces/movie.interface";
import { router } from "expo-router";
import { View, Text, Image, Pressable } from 'react-native'

const MovieSlide = ({ movie }: { movie: Movie }) => {
    return (

        <Pressable
            onPress={() => router.push(`/movie/${movie.id}`)}
            className="h-[210px] flex-1 justify-center items-end bg-[#25273c] rounded-xl m-2.5 relative"
        >
            <Image
                source={{ uri: movie.poster }}
                className="w-[140px] h-[210px] rounded-lg mr-[16px]"
                resizeMode="contain"
            />
            <View className="absolute left-0 top-4 flex-col items-start pl-4 w-[60%]">
                <Text
                    className="text-neutral-300 text-[19px] font-bold mb-1"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {movie.title}
                </Text>
                <Text
                    className="text-[#ffd700] text-base font-semibold"
                >
                    ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                </Text>
                <Text
                    className="text-neutral-400 text-xs font-normal mt-1 leading-tight w-[80%]"
                    numberOfLines={9}
                    ellipsizeMode="tail"
                // style={{ textAlign: 'justify' }}
                >
                    {movie.description}
                </Text>

            </View>
        </Pressable>
    );
}

export default MovieSlide