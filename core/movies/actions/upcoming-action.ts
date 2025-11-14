import { moviesApi } from "@/core/api/movie-api";
import { Movie } from "@/sync-movies/src/interfaces/movie.interface";

interface FetchMoviesOptions {
    page?: number;
    limit?: number;
}

export const upcomingMoviesAction = async ({ page = 1, limit = 15 }: FetchMoviesOptions) => {
    try {
        const { data } = await moviesApi.get<Movie>('/upcoming', {
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
