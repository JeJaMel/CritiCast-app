import { View, Text, Pressable } from 'react-native';

interface Props { ratings: string[]; selectedRating: string | null; setSelectedRating: (r: string | null) => void; }

export default function RatingsSection({ ratings, selectedRating, setSelectedRating }: Props) {
    return (
        <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>Minimum Rating</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {ratings.map(r => (
                    <Pressable key={r} onPress={() => setSelectedRating(r === selectedRating ? null : r)} style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: selectedRating === r ? '#3b82f6' : 'rgba(255,255,255,0.08)' }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>{r}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}