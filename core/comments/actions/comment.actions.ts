import { moviesApi } from "@/core/api/api";
import { CreateCommentPayload, UpdateCommentPayload, Comment } from "../interfaces/comments.interface";
import { PaginatedResponse } from "@/core/api/interfaces/api-response.interface";
import { mapApiCommentToCommentUI } from "../mappers/comment.mapper";

interface CreateCommentParams {
    movieId: number;
    payload: CreateCommentPayload;
}

interface UpdateCommentParams {
    movieId: number;
    payload: UpdateCommentPayload;
    commentId: number;
}

// --- CREATE ---
export const createCommentAction = async ({ movieId, payload }: CreateCommentParams): Promise<void> => {
    try {
        const apiPayload = {
            rating: payload.rating,
            comment_text: payload.commentText,
        };
        await moviesApi.post(`/movies/${movieId}/comments`, apiPayload);
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

// --- GET ---
export const getCommentsAction = async (movieId: number): Promise<Comment[]> => {
    try {
        const { data } = await moviesApi.get<PaginatedResponse<any>>(`/movies/${movieId}/comments`);

        const mappedComments: Comment[] = data.items.map(mapApiCommentToCommentUI);

        return mappedComments;

    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

// --- UPDATE ---
export const updateCommentAction = async ({ movieId, commentId, payload }: UpdateCommentParams): Promise<void> => {
    try {
        const apiPayload = {
            rating: payload.rating,
            comment_text: payload.commentText,
        };
        await moviesApi.put(`/movies/${movieId}/comments/${commentId}`, apiPayload);
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

// --- DELETE ---
interface DeleteCommentParams {
    commentId: number;
    movieId: number;
}
export const deleteCommentAction = async ({ movieId, commentId }: DeleteCommentParams): Promise<void> => {
    try {
        await moviesApi.delete(`/movies/${movieId}/comments/${commentId}`);
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};