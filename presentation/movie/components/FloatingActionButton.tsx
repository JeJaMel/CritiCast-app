import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    onPress?: () => void;
};

const FloatingActionButton = ({ onPress }: Props) => (
    <View className='absolute bottom-16 right-8'>
        <Pressable
            className='w-14 h-14 rounded-full bg-blue-500 justify-center items-center active:bg-blue-600'
            style={{
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
            }}
        >
            <Ionicons name="pencil-sharp" size={24} color="#ffffff" />
        </Pressable>
    </View>
);

export default FloatingActionButton;