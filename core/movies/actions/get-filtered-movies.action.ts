import { moviesApi } from "@/core/api/api";
import { mapApiMoviesToMoviesUI } from "../mappers/movies.mapper";
import { MoviesUI } from "../interfaces/moviesUI.interface";
import { MovieFilters } from "../interfaces/filters.interface";
import { PaginatedResponse } from "@/core/api/interfaces/api-response.interface";

interface FetchOptions {
    page?: number;
    limit?: number;
    filters: MovieFilters; 
}

export const getFilteredMoviesAction = async ({ page = 1, limit = 15, filters }: FetchOptions) => {
    try {
        const { data } = await moviesApi.get<PaginatedResponse<any>>('/movies', {
            params: {
                page,
                limit,
                ...filters, 
            }
        });

        const mappedMovies: MoviesUI[] = mapApiMoviesToMoviesUI(data.items);

        return {
            ...data,
            items: mappedMovies,
        };
    } catch (error) {
        console.log(error);
        throw 'Cannot load filtered movies!';
    }
}