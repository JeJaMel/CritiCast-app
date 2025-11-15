import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Comment } from '@/core/comments/interfaces/comments.interface';
import { useCommentMutations } from '../hooks/useCommentMutation';

interface Props {
    movieId: number;
    existingComment?: Comment;
    onSuccess: () => void;
    onCancel?: () => void;
}

const CommentForm = ({ movieId, existingComment, onSuccess, onCancel }: Props) => {
    const [rating, setRating] = useState(existingComment?.rating ?? 0);
    const [commentText, setCommentText] = useState(existingComment?.commentText ?? '');
    const { createComment, updateComment } = useCommentMutations(movieId);

    const isEditing = !!existingComment;
    const mutation = isEditing ? updateComment : createComment;

    const handleSubmit = async () => {
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        if (commentText.trim().length < 10) {
            alert('Comment must be at least 10 characters');
            return;
        }

        if (isEditing) {
            await updateComment.mutateAsync({
                movieId: movieId,
                commentId: existingComment.id,
                payload: { rating, commentText }
            });
        } else {
            await createComment.mutateAsync({
                movieId: movieId,
                payload: { rating, commentText }
            });

            setRating(0);
            setCommentText('');
        }

        onSuccess();
    }

    return (
        <View className='bg-[#1a1d29]/70 rounded-2xl p-5 border border-blue-500/20'>
            {/* Rating Section */}
            <View className='mb-4'>
                <Text className='text-white font-semibold text-base mb-3'>Your Rating</Text>
                <View className='flex-row items-center justify-center py-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable
                            key={star}
                            onPress={() => setRating(star)}
                            className='px-2'
                        >
                            <Ionicons
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={36}
                                color={star <= rating ? '#fbbf24' : '#4b5563'}
                            />
                        </Pressable>
                    ))}
                </View>
                {rating > 0 && (
                    <Text className='text-yellow-400 text-center mt-2 font-semibold'>
                        {rating} {rating === 1 ? 'star' : 'stars'}
                    </Text>
                )}
            </View>

            {/* Comment Input */}
            <View className='mb-4'>
                <Text className='text-white font-semibold text-base mb-3'>Your Review</Text>
                <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder="Share your thoughts about this movie..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                    className='bg-black/30 text-white text-base rounded-xl p-4 min-h-[100px] border border-white/10'
                    style={{ textAlignVertical: 'top' }}
                />
                <Text className='text-white/40 text-xs mt-2 text-right'>
                    {commentText.length}/500
                </Text>
            </View>

            {/* Action Buttons */}
            <View className='flex-row' style={{ gap: 8 }}>
                {onCancel && (
                    <Pressable
                        onPress={onCancel}
                        className='flex-1 bg-white/5 py-3 rounded-xl active:bg-white/10'
                        disabled={mutation.isPending}
                    >
                        <Text className='text-white/60 font-semibold text-center text-base'>
                            Cancel
                        </Text>
                    </Pressable>
                )}
                <Pressable
                    onPress={handleSubmit}
                    className='flex-1 bg-blue-500 py-3 rounded-xl active:bg-blue-600'
                    disabled={mutation.isPending || rating === 0}
                    style={{ opacity: mutation.isPending || rating === 0 ? 0.5 : 1 }}
                >
                    {mutation.isPending ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className='text-white font-bold text-center text-base'>
                            {isEditing ? 'Update Review' : 'Submit Review'}
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default CommentForm;