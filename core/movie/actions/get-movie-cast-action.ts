import { moviesApi } from "../../api/api";
import { Cast } from "@/sync-movies/src/interfaces/cast.interface";

export const getMovieCastAction = async (id: number | string): Promise<Cast[]> => {
    try {
        const { data } = await moviesApi.get<Cast[]>(`/movies/${id}/cast`)
        return data
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}