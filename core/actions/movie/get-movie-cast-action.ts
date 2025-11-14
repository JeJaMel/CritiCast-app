import { movieApi } from "@/core/api/movie-api";
import { Cast } from "@/infraestructures/interfaces/cast.interface";
import { CreditResponse } from "@/infraestructures/interfaces/credits-response";
import { CredditMapper } from "@/infraestructures/mappers/creddits.mapper";

export const getMovieCastAction = async (id: number | string): Promise<Cast[]> => {
    try {
        const { data } = await movieApi.get<CreditResponse>(`/${id}/credits`)
        const cast = data.cast.map(CredditMapper.fromTheMovieDBToCast)

        return cast
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies!';
    }
}