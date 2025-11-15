import { Comment } from "../interfaces/comments.interface";

export const mapApiCommentToCommentUI = (apiComment: any): Comment => {
    return {
        id: apiComment.id,
        commentText: apiComment.comment_text,
        rating: apiComment.rating,
        createdAt: apiComment.created_at,
        user: {
            id: apiComment.users.id,
            username: apiComment.users.username,
        }
    };
};