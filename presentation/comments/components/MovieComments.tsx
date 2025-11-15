import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useComments } from '../hooks/useComments';

interface Props {
    movieId: number;
    currentUserId?: number;
}

const MovieComments = ({ movieId, currentUserId }: Props) => {
    const { commentsQuery } = useComments(movieId);
    const [showForm, setShowForm] = useState(false);

    const comments = commentsQuery.data ?? [];
    const userComment = comments.find(comment => comment.user && comment.user.id === currentUserId);
    const otherComments = comments.filter(comment => comment.user && comment.user.id !== currentUserId);

    if (commentsQuery.isLoading) {
        return (
            <View className='px-4 py-8'>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    return (
        <View className='px-4 mb-8'>
            {/* Section Header */}
            <View className='flex-row items-center justify-between mb-6'>
                <View className='flex-row items-center'>
                    <Ionicons name="chatbubbles" size={24} color="#3b82f6" style={{ marginRight: 12 }} />
                    <View>
                        <Text className='text-2xl font-bold text-white'>
                            Reviews & Ratings
                        </Text>
                        <Text className='text-sm text-white/60 mt-1'>
                            {comments.length} {comments.length === 1 ? 'review' : 'reviews'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* User's Comment or Add Button */}
            {userComment ? (
                <View className='mb-6'>
                    <Text className='text-blue-400 text-sm font-semibold mb-3 ml-1'>Your Review</Text>
                    <CommentItem
                        comment={userComment}
                        movieId={movieId}
                        isOwnComment={true}
                    />
                </View>
            ) : (
                <Pressable
                    onPress={() => setShowForm(!showForm)}
                    className='bg-blue-500/15 border-2 border-dashed border-blue-500/40 rounded-2xl p-6 mb-6 active:bg-blue-500/25'
                >
                    <View className='flex-row items-center justify-center'>
                        <Ionicons
                            name={showForm ? "close-circle" : "add-circle"}
                            size={24}
                            color="#3b82f6"
                            style={{ marginRight: 8 }}
                        />
                        <Text className='text-blue-400 text-base font-bold'>
                            {showForm ? 'Cancel' : 'Write a Review'}
                        </Text>
                    </View>
                </Pressable>
            )}

            {/* Comment Form */}
            {showForm && !userComment && (
                <View className='mb-6'>
                    <CommentForm
                        movieId={movieId}
                        onSuccess={() => setShowForm(false)}
                    />
                </View>
            )}

            {/* Other Comments */}
            {otherComments.length > 0 && (
                <View>
                    <Text className='text-white/60 text-sm font-semibold mb-3 ml-1'>
                        Other Reviews
                    </Text>
                    <View style={{ gap: 12 }}>
                        {otherComments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                movieId={movieId}
                                isOwnComment={false}
                            />
                        ))}
                    </View>
                </View>
            )}

            {/* Empty State */}
            {comments.length === 0 && !showForm && (
                <View className='items-center py-12'>
                    <View className='w-20 h-20 rounded-full bg-white/5 justify-center items-center mb-4'>
                        <Ionicons name="chatbubble-outline" size={40} color="rgba(255, 255, 255, 0.2)" />
                    </View>
                    <Text className='text-white/40 text-base text-center'>
                        No reviews yet. Be the first to review!
                    </Text>
                </View>
            )}
        </View>
    );
};

export default MovieComments;