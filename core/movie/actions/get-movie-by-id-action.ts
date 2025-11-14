import { moviesApi } from "../../api/api";
import { CompletedMovie } from "@/sync-movies/src/interfaces/movie.interface";

export const getMovieByIdAction = async (id: number | string): Promise<CompletedMovie> => {
    try {
        const { data } = await moviesApi.get<CompletedMovie>(`/${id}`)

        return data
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}