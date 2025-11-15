import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const MovieLoading = () => {
    return (
        <View className="justify-center items-center flex-1 bg-[#0f1117]">
            <LinearGradient
                colors={['#1a1d29', '#0f1117', '#1a1d29']}
                className="absolute inset-0"
            />
            <View className="items-center">
                <View className="mb-8">
                    <View className="w-24 h-24 rounded-full bg-blue-500/10 justify-center items-center">
                        <Ionicons name="film" size={40} color="#3b82f6" />
                    </View>
                    <View className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                </View>
                <ActivityIndicator color="#3b82f6" size={40} />
                <Text className="mt-6 text-xl text-white font-bold">
                    Loading Movie Details
                </Text>
                <Text className="mt-2 text-sm text-white/50">
                    Please wait a moment...
                </Text>
            </View>
        </View>
    );
};

export default MovieLoading;