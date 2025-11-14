import { router } from 'expo-router';
import { Pressable, Image } from 'react-native'

interface Props {
    id: number;
    poster: string;
    smallPoster?: boolean;
    classname?: string;
}

const MoviePoster = ({ id, poster, smallPoster = false, classname }: Props) => {
    return (
        <Pressable className={`active:opacity-90 px-2 ${classname} `}
            //@ts-ignore
            onPress={() => router.push(`/movie/${id}`)}

        >
            < Image
                className='shadow-lg rounded-2xl 2-full h-full'
                source={{ uri: poster }
                }
                style={{
                    width: smallPoster ? 85 : 150,
                    height: smallPoster ? 130 : 250,
                }}
                resizeMode='cover'
            />

        </Pressable >
    )
}

export default MoviePoster