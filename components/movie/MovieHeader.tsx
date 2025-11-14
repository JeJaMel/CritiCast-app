import { View, Text, useWindowDimensions, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  poster: string;
  originalTitle: string;
  title: string;
}

const MovieHeader = ({ poster, originalTitle, title }: Props) => {

  const { height: screenHeight } = useWindowDimensions();

  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{
          height: screenHeight * 0.4,
          position: 'absolute',
          zIndex: 1,
          width: '100%',
        }}

      />

      <View style={{
        position: 'absolute',
        zIndex: 99,
        elevation: 9,
        top: 40,
        left: 10,
      }} >
        <Pressable >
          <Ionicons name='arrow-back'
            size={30}
            color='white'
            className='shadow'
            onPress={() => router.back()}
          />
        </Pressable>
      </View>

      <View
        style={{ height: screenHeight * 0.7 }}
        className='shadow-xl shadow-black/20'
      >
        <View className='flex-1 rounded-b-[25px] overflow-hidden ' >
          <Image
            source={{ uri: poster }}
            resizeMode='cover'
            className='flex-1'
          />
        </View>
      </View>

      <View className="px-6 mt-6 space-y-1">
        <Text className="text-neutral-500 text-sm tracking-wide">
          {originalTitle}
        </Text>
        <Text className=" text-3xl text-neutral-300 font-semibold tracking-tight">
          {title}
        </Text>
      </View>


    </>
  )
}

export default MovieHeader