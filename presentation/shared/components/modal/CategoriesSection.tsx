import { View, Text, Pressable } from 'react-native';

interface Props { categories: string[]; selectedCategories: string[]; toggleCategory: (c: string) => void; }

export default function CategoriesSection({ categories, selectedCategories, toggleCategory }: Props) {
    return (
        <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>Categories</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {categories.map(cat => (
                    <Pressable key={cat} onPress={() => toggleCategory(cat)} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: selectedCategories.includes(cat) ? '#3b82f6' : 'rgba(255,255,255,0.08)' }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>{cat}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}