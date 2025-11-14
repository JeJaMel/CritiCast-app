import { moviesApi } from "../../api/movie-api";
import { Cast } from "@/sync-movies/src/interfaces/cast.interface";

export const getMovieCastAction = async (id: number | string): Promise<Cast[]> => {
    try {
        const { data } = await moviesApi.get<Cast>(`/${id}/credits`)
        return data
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}