import { Formatter } from '@/config/helpers/formatter';
import { CompletedMovie } from '@/infraestructures/interfaces/movie.interface';
import { Text, View } from 'react-native';

interface Props {
    movie: CompletedMovie;
}

const MovieDescription = ({ movie }: Props) => {
    return (
        <View className='mx-5' >
            <View className='flex flex-row px-1 mt-1'>
                <Text
                    className="text-[#ffd700] text-base font-semibold"
                >
                    ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                </Text>
                <Text className="text-neutral-300 ml-2">
                    - {movie.genres.join(',  ')}
                </Text>
            </View>
            <Text className='text-neutral-200 mt-2 font-bold px-1' >Description</Text>
            <Text className='text-neutral-200 mt-2 font-normal px-1' >{movie.description ? movie.description : 'No movie description...'}</Text>

            <Text
                className="color-green-500 text-base font-semibold mt-1 px-1"
            >
                {/* {(movie.budget ? movie.budget.toLocaleString('de-DE', { style: 'currency', currency: 'USD' }) : 'No Budget data')} */}
                {movie.budget ? Formatter.currency(movie.budget) : 'No Budget data'}
            </Text>
        </View>
    )
}

export default MovieDescription