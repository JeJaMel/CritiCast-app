import { movieApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infraestructures/interfaces/moviedb-response";
import { MovieMapper } from "@/infraestructures/mappers/movie.mapper";

export const nowPlayingAction = async () => {
    try {
        const { data } = await movieApi.get<MovieDBMoviesResponse>('/now_playing')
        const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)
        return movies;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}