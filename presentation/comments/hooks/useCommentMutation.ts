import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentAction, updateCommentAction, deleteCommentAction } from "@/core/comments/actions/comment.actions";
import { Alert } from "react-native";

export const useCommentMutations = (movieId: number) => {
    const queryClient = useQueryClient();

    const invalidateCommentQueries = () => {
        queryClient.invalidateQueries({ queryKey: ['comments', movieId] });
        queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
    };

    // Create Comment mutation
    const createComment = useMutation({
        mutationFn: createCommentAction,
        onSuccess: () => {
            invalidateCommentQueries();
        },
        onError: (error: any) => {
            if (error.response && error.response.status === 409) {
                Alert.alert(
                    "Review Already Exists",
                    "You have already submitted a review for this movie. Please edit your existing review instead."
                );
            } else {
                Alert.alert(
                    "Error",
                    "Failed to submit your review. Please try again later."
                );
            }
            console.error("Failed to create comment:", error);
        },
    });

    // Updade Comment mutation
    const updateComment = useMutation({
        mutationFn: updateCommentAction,
        onSuccess: () => {
            console.log("Comment updated successfully, invalidating queries...");
            invalidateCommentQueries();
        },
        onError: (error) => {
            console.error("Failed to update comment:", error);
        },
    });

    // Delete Comment mutation
    const deleteComment = useMutation({
        mutationFn: deleteCommentAction,
        onSuccess: () => {
            console.log("Comment deleted successfully, invalidating queries...");
            invalidateCommentQueries();
        },
        onError: (error) => {
            console.error("Failed to delete comment:", error);
        },
    });

    return {
        createComment,
        updateComment,
        deleteComment,
    };
};