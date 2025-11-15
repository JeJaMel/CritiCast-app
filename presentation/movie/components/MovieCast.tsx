import { View, FlatList } from 'react-native'
import { ActorCard } from './ActorCard';
import { Cast } from '@/sync-movies/src/interfaces/cast.interface';

interface Props {
    cast: Cast[];
}

const MovieCast = ({ cast }: Props) => {
    return (
        <View className="mt-1 px-5 mb-15">
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