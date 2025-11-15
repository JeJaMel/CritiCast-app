import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

interface Props { onClear: () => void; onApply: () => void; }

export default function ActionButtons({ onClear, onApply }: Props) {
    return (
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, marginBottom: 16 }}>
            <Pressable onPress={() => { Haptics.selectionAsync(); onClear(); }} style={{ flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Clear All</Text>
            </Pressable>
            <Pressable onPress={() => { Haptics.selectionAsync(); onApply(); }} style={{ flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#3b82f6', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Apply Filters</Text>
            </Pressable>
        </View>
    );
}