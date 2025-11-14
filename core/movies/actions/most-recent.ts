import { moviesApi } from "@/core/api/api";
import { mapApiMoviesToMoviesUI } from "../mappers/movies.mapper";
import { MoviesUI } from "../interfaces/moviesUI.interface";

interface FetchMoviesOptions {
    page?: number;
    limit?: number;
}

export const mostRecentAction = async ({ page = 1, limit = 15 }: FetchMoviesOptions) => {
    try {
        const { data } = await moviesApi.get<any>('/movies', {
            params: {
                page: page,
                limit: limit,
                sortBy: 'release_date',
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
