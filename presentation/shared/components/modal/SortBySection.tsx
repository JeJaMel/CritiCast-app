import { View, Text, Pressable } from 'react-native';

interface Props { sortBy: string; setSortBy: (s: string) => void; }

export default function SortBySection({ sortBy, setSortBy }: Props) {
    return (
        <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>Sort By</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable onPress={() => setSortBy('rating')} style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: sortBy === 'rating' ? '#3b82f6' : 'rgba(255,255,255,0.08)' }}>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Rating</Text>
                </Pressable>
                <Pressable onPress={() => setSortBy('date')} style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: sortBy === 'date' ? '#3b82f6' : 'rgba(255,255,255,0.08)' }}>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Date</Text>
                </Pressable>
            </View>
        </View>
    );
}