import { Cast } from '@/sync-movies/src/interfaces/cast.interface';
import { Image, Text, View } from 'react-native';

interface Props {
    actor: Cast;
}

export const ActorCard = ({ actor }: Props) => {
    return (
        <View className="mx-2 w-[80px] items-center">
            <Image
                source={{ uri: actor.avatar }}
                className="w-[80px] h-[110px] rounded-xl shadow-lg shadow-black/20 mb-2"
                resizeMode="cover"
            />

            <View className="w-full items-center">
                <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    className="font-bold text-neutral-200 text-xs text-center"
                >
                    {actor.name}
                </Text>
                <Text className="text-neutral-400 text-[10px] text-center mt-1">{actor.character}</Text>
            </View>
        </View>
    );
};