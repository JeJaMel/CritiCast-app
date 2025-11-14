import { movieApi } from "@/core/api/movie-api";
import { CompletedMovie } from "@/infraestructures/interfaces/movie.interface";
import { MovieDBMDetailsResponse } from "@/infraestructures/interfaces/moviedb-movie.response";
import { MovieMapper } from "@/infraestructures/mappers/movie.mapper";

export const getMovieByIdAction = async (id: number | string): Promise<CompletedMovie> => {
    try {
        const { data } = await movieApi.get<MovieDBMDetailsResponse>(`/${id}`)
        console.log('HTTP MOVIE LOADED')

        return MovieMapper.fromTheMovieDBToCompleteMovie(data);
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}