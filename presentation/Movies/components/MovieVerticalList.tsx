import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import MoviePoster from './MoviePoster';
import { MoviesUI } from '@/core/movies/interfaces/moviesUI.interface';

interface Props {
    title?: string;
    movies: MoviesUI[];
    classNameView?: string;
    classNameText?: string;
    isFetchingNextPage?: boolean;
    loadNextPage?: () => void;
}

const MovieVerticalList = ({ title, movies, classNameView, classNameText, loadNextPage, isFetchingNextPage }: Props) => {
    const screenWidth = Dimensions.get('window').width;
    const numColumns = 3;
    const spacing = 12;
    const horizontalPadding = 16;

    // Calculate optimal poster width
    const totalSpacing = spacing * (numColumns - 1) + horizontalPadding * 2;
    const posterWidth = (screenWidth - totalSpacing) / numColumns;

    const onEndReached = () => {
        if (isFetchingNextPage) return;
        console.log('Loading next Movies...');
        loadNextPage && loadNextPage();
    };

    return (
        <View className={`${classNameView}`}>
            {title && (
                <Text className={`text-3xl font-bold px-4 mb-4 ${classNameText}`}>
                    {title}
                </Text>
            )}

            <FlatList
                data={movies}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    const isLastInRow = (index + 1) % numColumns === 0;
                    return (
                        <View
                            style={{
                                width: posterWidth,
                                marginRight: isLastInRow ? 0 : spacing,
                                marginBottom: spacing,
                            }}
                        >
                            <MoviePoster
                                id={item.id}
                                poster={item.poster}
                            />
                        </View>
                    );
                }}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                columnWrapperStyle={{
                    paddingHorizontal: horizontalPadding,
                }}
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: 4,
                }}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <View style={{
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: screenWidth,
                        }}>
                            <ActivityIndicator size="large" color="#999" />
                        </View>
                    ) : (
                        <View style={{ height: 20 }} />
                    )
                }
            />
        </View>
    );
};

export default MovieVerticalList;