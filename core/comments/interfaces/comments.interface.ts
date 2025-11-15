export interface Comment {
    id: number;
    commentText: string;
    rating: number;
    createdAt: string;
    user: {
        id: number;
        username: string;
    };
}

export interface CreateCommentPayload {
    rating: number;
    commentText: string;
}

export interface UpdateCommentPayload {
    rating: number;
    commentText: string;
}