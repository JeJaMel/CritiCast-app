import { getMovieByIdAction } from "@/core/movie/actions/get-movie-by-id-action"
import { getMovieCastAction } from "@/core/movie/actions/get-movie-cast-action";
import { useQuery } from "@tanstack/react-query"

export const useMovie = (id: number) => {

    const movieQuery = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieByIdAction(id),
        staleTime: 1000 * 60 * 60 * 24, //24 Hours
    });

    const castQuery = useQuery({
        queryKey: ['cast', id],
        queryFn: () => getMovieCastAction(id),
        staleTime: 1000 * 60 * 60 * 24, //24 Hours
    });

    return {
        movieQuery,
        castQuery,
    }
}
