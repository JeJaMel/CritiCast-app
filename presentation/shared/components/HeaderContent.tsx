import { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

const HeaderContent = () => {
    const backgroundColor = useThemeColor({}, 'background');
    const [query, setQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [sortBy, setSortBy] = useState('rating');

    const categories = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
        'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
        'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
    ];

    const ratings = ['8+', '7+', '6+', '5+'];

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <>
            <View
                className="flex-row items-center px-3"
                style={{ backgroundColor, height: 50 }}
            >
                {!isSearchFocused && (
                    <Text
                        className="text-white text-2xl font-bold tracking-tight"
                        style={{ flexShrink: 1 }}
                    >
                        CritiCast
                    </Text>
                )}

                <View
                    style={{
                        marginLeft: isSearchFocused ? 0 : 12,
                        width: isSearchFocused ? '100%' : 200,
                        height: '100%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Searchbar
                            placeholder="Search movies..."
                            value={query}
                            onChangeText={setQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            inputStyle={{
                                fontSize: 14,
                                textAlign: 'left',
                                minHeight: 0,
                                paddingRight: 29,
                                paddingVertical: 0,
                                textAlignVertical: 'center',
                                lineHeight: 18,
                            }}
                            clearIcon={query ? "close" : undefined}
                            style={{
                                height: 40,
                                elevation: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: 20,
                                justifyContent: 'center',
                                paddingVertical: 0,
                            }}
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>

                    {isSearchFocused && (
                        <Pressable
                            onPress={() => setIsFilterModalVisible(true)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons name="filter" size={20} color="rgba(255, 255, 255, 0.8)" />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => setIsFilterModalVisible(false)}
                    />

                    <View
                        style={{
                            backgroundColor: '#1a1d29',
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            paddingTop: 24,
                            paddingBottom: 40,
                            maxHeight: '80%',
                        }}
                    >
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 24,
                            marginBottom: 24,
                        }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
                                Filters
                            </Text>
                            <Pressable onPress={() => setIsFilterModalVisible(false)}>
                                <Ionicons name="close" size={28} color="#fff" />
                            </Pressable>
                        </View>

                        <ScrollView style={{ paddingHorizontal: 24 }}>
                            {/* Sort By Section */}
                            <View style={{ marginBottom: 28 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>
                                    Sort By
                                </Text>
                                <View style={{ flexDirection: 'row', gap: 12 }}>
                                    <Pressable
                                        onPress={() => setSortBy('rating')}
                                        style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 20,
                                            backgroundColor: sortBy === 'rating' ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)',
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>
                                            Rating
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setSortBy('date')}
                                        style={{
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 20,
                                            backgroundColor: sortBy === 'date' ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)',
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>
                                            Date
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            {/* Rating Section */}
                            <View style={{ marginBottom: 28 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>
                                    Minimum Rating
                                </Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                                    {ratings.map((rating) => (
                                        <Pressable
                                            key={rating}
                                            onPress={() => setSelectedRating(rating === selectedRating ? null : rating)}
                                            style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                borderRadius: 20,
                                                backgroundColor: selectedRating === rating ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>
                                                {rating}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Categories Section */}
                            <View style={{ marginBottom: 28 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 }}>
                                    Categories
                                </Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                                    {categories.map((category) => (
                                        <Pressable
                                            key={category}
                                            onPress={() => toggleCategory(category)}
                                            style={{
                                                paddingHorizontal: 16,
                                                paddingVertical: 10,
                                                borderRadius: 20,
                                                backgroundColor: selectedCategories.includes(category)
                                                    ? '#3b82f6'
                                                    : 'rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>
                                                {category}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                                <Pressable
                                    onPress={() => {
                                        setSelectedCategories([]);
                                        setSelectedRating(null);
                                        setSortBy('rating');
                                    }}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 14,
                                        borderRadius: 12,
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                        Clear All
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setIsFilterModalVisible(false)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 14,
                                        borderRadius: 12,
                                        backgroundColor: '#3b82f6',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                        Apply Filters
                                    </Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default HeaderContent;