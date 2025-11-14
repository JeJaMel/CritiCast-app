import { moviesApi } from "@/core/api/api";
import { Movie } from "@/sync-movies/src/interfaces/movie.interface";

interface FetchMoviesOptions {
    page?: number;
    limit?: number;
}

export const topRatedMoviesAction = async ({ page = 1, limit = 15 }: FetchMoviesOptions) => {
    try {
        const { data } = await moviesApi.get<Movie>('/top_rated', {
            params: {
                page: page,
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}
