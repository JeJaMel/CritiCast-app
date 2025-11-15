import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface Props { onClose: () => void; title?: string; }

export default function ModalHeader({ onClose, title = 'Filters' }: Props) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            <Pressable onPress={() => { Haptics.selectionAsync(); onClose(); }}>
                <Ionicons name="close" size={28} color="#fff" />
            </Pressable>
        </View>
    );
}