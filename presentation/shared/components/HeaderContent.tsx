import { useState } from 'react';
import { View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

const HeaderContent = () => {
    const backgroundColor = useThemeColor({}, 'background');
    const [query, setQuery] = useState('');

    return (
        <View
            className="flex-row items-center px-3"
            style={{ backgroundColor, height: 50 }}
        >
            <Text
                className="text-white text-2xl font-bold tracking-tight"
                style={{ flexShrink: 1 }}
            >
                CritiCast
            </Text>

            <View style={{ marginLeft: 12, width: 200, height: '100%', justifyContent: 'center' }}>
                <Searchbar
                    placeholder="Search movies..."
                    value={query}
                    onChangeText={setQuery}
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
        </View>
    );
};

export default HeaderContent;