import { PaginatedResponse } from "@/core/api/interfaces/api-response.interface";
import { moviesApi } from "../../api/api";
import { MoviesUI } from "../interfaces/moviesUI.interface";
import { mapApiMoviesToMoviesUI } from "../mappers/movies.mapper";

export const nowPlayingAction = async (): Promise<MoviesUI[]> => {
    try {
        const { data } = await moviesApi.get<PaginatedResponse<any>>('/movies', {
            params: {
                nowPlaying: 1,
                sortBy: 'tmdb_rating',
                limit: 15,
            },
        });

        const mappedMovies: MoviesUI[] = mapApiMoviesToMoviesUI(data.items);

        return mappedMovies;

    } catch (error: any) {
        console.error('[nowPlayingAction] request failed:', {
            message: error.message,
            status: error.response?.status,
            url: error.config?.baseURL + error.config?.url,
            data: error.response?.data,
        });
        return [];
    }
}