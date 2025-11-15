import { Formatter } from '@/helpers/formatter';
import { CompletedMovie } from '@/sync-movies/src/interfaces/movie.interface';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    movie: CompletedMovie;
}

const MovieDescription = ({ movie }: Props) => {
    return (
        <View className='bg-[#1a1d29]/50 rounded-2xl p-5'>
            {/* Rating & Genres */}
            <View className='flex-row items-center flex-wrap mb-4' style={{ gap: 12 }}>
                <View className='flex-row items-center bg-yellow-500/15 px-3 py-2 rounded-full border border-yellow-500/30'>
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Text className="text-yellow-400 text-base font-bold ml-1.5">
                        {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                    </Text>
                </View>

                {/* User Rating */}
                {movie.user_rating && movie.user_rating > 0 && (
                    <View className='flex-row items-center bg-blue-500/15 px-3 py-2 rounded-full border border-blue-500/30'>
                        <Ionicons name="people" size={16} color="#3b82f6" />
                        <Text className="text-blue-400 text-base font-bold ml-1.5">
                            {movie.user_rating.toFixed(1)}
                        </Text>
                        <Text className="text-blue-400/60 text-xs font-semibold ml-1"></Text>
                    </View>
                )}

                {movie.genres.map((genre, index) => (
                    <View key={index} className='bg-blue-500/15 px-3 py-2 rounded-full border border-blue-500/30'>
                        <Text className="text-blue-400 text-sm font-semibold">
                            {genre}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Description */}
            <View className='mb-4'>
                <View className='flex-row items-center mb-3'>
                    <View style={{ width: 4, height: 20, backgroundColor: '#3b82f6', borderRadius: 999, marginRight: 12 }} />
                    <Text className='text-white text-lg font-bold'>Overview</Text>
                </View>
                <Text className='text-white/80 text-base leading-6'>
                    {movie.description || 'No description available for this movie.'}
                </Text>
            </View>

            {/* Budget */}
            {movie.budget > 0 ? (
                <View className='flex-row items-center bg-green-500/15 px-4 py-3 rounded-xl border border-green-500/30'>
                    <Ionicons name="cash-outline" size={20} color="#22c55e" style={{ marginRight: 8 }} />
                    <View>
                        <Text className='text-green-400/70 text-xs font-semibold mb-0.5'>Budget</Text>
                        <Text className="text-green-400 text-base font-bold">
                            {Formatter.currency(movie.budget)}
                        </Text>
                    </View>
                </View>
            ) : null}
        </View>
    )
}

export default MovieDescription;