import { getCommentsAction } from "@/core/comments/actions/comment.actions";
import { useQuery } from "@tanstack/react-query";

export const useComments = (movieId: number) => {
    const commentsQuery = useQuery({
        queryKey: ['comments', movieId],
        queryFn: () => getCommentsAction(movieId),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
    return { commentsQuery };
}