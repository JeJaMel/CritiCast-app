import { movieApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infraestructures/interfaces/moviedb-response";
import { MovieMapper } from "@/infraestructures/mappers/movie.mapper";

interface FetchMoviesOptions {
    page?: number;
    limit?: number;
}

export const topRatedMoviesAction = async ({ page = 1, limit = 15 }: FetchMoviesOptions) => {
    try {
        const { data } = await movieApi.get<MovieDBMoviesResponse>('/top_rated', {
            params: {
                page: page,
            }
        })
        const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)
        return movies;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}

// import { fetchMoviesWrapper, FetchMoviesOptions } from "./movie-list.action";

// export const topRatedMoviesAction = async (options: FetchMoviesOptions) => {
//     fetchMoviesWrapper('/top_rated', options)
// }