import { moviesApi } from "../api/movie-api";
import { Movie } from "@/sync-movies/src/interfaces/movie.interface";

export const nowPlayingAction = async () => {
    try {
        const { data } = await moviesApi.get<Movie>('/now_playing')
        return data;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}