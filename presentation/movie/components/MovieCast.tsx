import { View, Text, FlatList } from 'react-native'
import { ActorCard } from './ActorCard';
import { Cast } from '@/sync-movies/src/interfaces/cast.interface';

interface Props {
    cast: Cast[];
}

const MovieCast = ({ cast }: Props) => {
    return (
        <View className="mt-1 px-5 mb-15">
            <Text className="text-neutral-200 text-lg font-bold mb-2 px-1">
                Cast
            </Text>
            <FlatList
                horizontal
                data={cast}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                renderItem={({ item }) => <ActorCard actor={item} />}
            />
        </View>
    )
}

export default MovieCast