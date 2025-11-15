import { moviesApi } from "@/core/api/api";
import { MoviesUI } from "../interfaces/moviesUI.interface";
import { mapApiMoviesToMoviesUI } from "../mappers/movies.mapper";

interface FetchMoviesOptions {
    page?: number;
    limit?: number;
}

export const topRatedMoviesAction = async ({ page = 1, limit = 15 }: FetchMoviesOptions) => {
    try {
        const { data } = await moviesApi.get<any>('/movies/top-rated', {
            params: {
                page,
                limit: limit,
                sortBy: 'tmdb_rating',
            }
        })
        const mappedMovies: MoviesUI[] = mapApiMoviesToMoviesUI(data.items);
        return {
            ...data,
            items: mappedMovies,
        };
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}
