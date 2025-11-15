import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import * as Haptics from 'expo-haptics';
import FilterModal from './modal/FilterModal';
import { MovieFilters } from '@/core/movies/interfaces/filters.interface'; 
import { router } from 'expo-router'; 

const HeaderContent = () => {
    const backgroundColor = useThemeColor({}, 'background');
    const [query, setQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const handleApplyFilters = (filters: MovieFilters) => {
        const finalFilters = {
            ...filters,
            search: query.trim().length > 0 ? query.trim() : undefined,
        };

        router.push({
            pathname: '/search',
            params: finalFilters
        });
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
                            onSubmitEditing={() => handleApplyFilters({})}
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
                            onPress={() => {
                                Haptics.selectionAsync();
                                setIsFilterModalVisible(true)
                            }}
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

            {/* Render the modal, passing visibility state and setter */}
            <FilterModal
                visible={isFilterModalVisible}
                onClose={() => setIsFilterModalVisible(false)}
                onApply={handleApplyFilters}
            />
        </>
    );
};

export default HeaderContent;