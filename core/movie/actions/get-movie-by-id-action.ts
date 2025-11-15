import { mapApiMovieToCompletedMovie } from "@/core/movies/mappers/movies.mapper";
import { moviesApi } from "../../api/api";
import { CompletedMovie } from "@/sync-movies/src/interfaces/movie.interface";

export const getMovieByIdAction = async (id: number | string): Promise<CompletedMovie> => {
    try {
        const { data } = await moviesApi.get<any>(`/movies/${id}`)
        const mapped: CompletedMovie = mapApiMovieToCompletedMovie(data);

        return mapped
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}