import { View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Comment } from '@/core/comments/interfaces/comments.interface';
import CommentForm from './CommentForm';
import { useCommentMutations } from '../hooks/useCommentMutation';

interface Props {
    comment: Comment;
    movieId: number;
    isOwnComment: boolean;
}

const CommentItem = ({ comment, movieId, isOwnComment }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { deleteComment } = useCommentMutations(movieId);

    const handleDelete = () => {
        Alert.alert(
            'Delete Review',
            'Are you sure you want to delete your review?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteComment.mutate({ commentId: comment.id, movieId: movieId }),
                },
            ]
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    if (isEditing) {
        return (
            <CommentForm
                movieId={movieId}
                existingComment={comment}
                onSuccess={() => setIsEditing(false)}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <View className='bg-[#1a1d29]/70 rounded-2xl p-4 border border-white/5'>
            {/* Header */}
            <View className='flex-row items-center justify-between mb-3'>
                <View className='flex-row items-center flex-1'>
                    <View className='w-10 h-10 rounded-full bg-blue-500/20 justify-center items-center mr-3'>
                        <Ionicons name="person" size={20} color="#3b82f6" />
                    </View>
                    <View className='flex-1'>
                        <Text className='text-white font-semibold text-base'>
                            {comment.user.username}
                        </Text>
                        <Text className='text-white/40 text-xs mt-0.5'>
                            {formatDate(comment.createdAt)}
                        </Text>
                    </View>
                </View>

                {/* Rating Stars */}
                <View className='flex-row items-center bg-yellow-500/15 px-2 py-1 rounded-full'>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text className='text-yellow-400 font-bold text-sm ml-1'>
                        {comment.rating.toFixed(1)}
                    </Text>
                </View>
            </View>

            {/* Comment Text */}
            <Text className='text-white/80 text-base leading-6 mb-3'>
                {comment.commentText}
            </Text>

            {/* Action Buttons (only for own comments) */}
            {isOwnComment && (
                <View className='flex-row items-center pt-3 border-t border-white/5' style={{ gap: 8 }}>
                    <Pressable
                        onPress={() => setIsEditing(true)}
                        className='flex-1 flex-row items-center justify-center bg-blue-500/15 py-2.5 rounded-xl active:bg-blue-500/25'
                    >
                        <Ionicons name="create-outline" size={18} color="#3b82f6" />
                        <Text className='text-blue-400 font-semibold text-sm ml-2'>Edit</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleDelete}
                        className='flex-1 flex-row items-center justify-center bg-red-500/15 py-2.5 rounded-xl active:bg-red-500/25'
                        disabled={deleteComment.isPending}
                    >
                        <Ionicons name="trash-outline" size={18} color="#ef4444" />
                        <Text className='text-red-400 font-semibold text-sm ml-2'>Delete</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default CommentItem;