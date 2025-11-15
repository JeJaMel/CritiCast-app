import { View, Text, useWindowDimensions, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  poster: string;
  originalTitle: string;
  title: string;
  releaseDate?: string;
}

const MovieHeader = ({ poster, originalTitle, title, releaseDate }: Props) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <>
      {/* Back Button */}
      <View className='absolute top-12 left-4 z-50'>
        <Pressable
          onPress={() => router.back()}
          className='w-10 h-10 rounded-full bg-black/60 justify-center items-center active:bg-black/80'
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </Pressable>
      </View>

      {/* Poster Image */}
      <View
        style={{ height: screenHeight * 0.7 }}
        className='shadow-xl shadow-black/20'
      >
        <View className='flex-1 rounded-b-[32px] overflow-hidden'>
          <Image
            source={{ uri: poster }}
            resizeMode='cover'
            className='flex-1'
          />

          {/* Top Gradient */}
          <LinearGradient
            colors={['rgba(15, 17, 23, 0.7)', 'transparent']}
            className='absolute top-0 left-0 right-0 h-32'
          />

          {/* Bottom Gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(15, 17, 23, 0.9)']}
            className='absolute bottom-0 left-0 right-0 h-40'
          />
        </View>
      </View>

      {/* Title Section */}
      <View className="px-5 mt-5">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white/50 text-xs tracking-widest uppercase font-semibold" numberOfLines={1}>
            {originalTitle}
          </Text>
          {releaseDate ? (
            <Text className="text-white/50 text-xs tracking-widest uppercase font-semibold">
              {releaseDate}
            </Text>
          ) : null}
        </View>
        <Text className="text-4xl text-white font-bold tracking-tight leading-tight">
          {title}
        </Text>
      </View>
    </>
  )
}

export default MovieHeader;