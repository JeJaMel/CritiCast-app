import { moviesApi } from '../../api/api';
import { Cast } from '@/sync-movies/src/interfaces/cast.interface';
import { mapCastItemsToCastArray } from '@/core/movies/mappers/cast.mapper';

export const getMovieCastAction = async (id: number | string): Promise<Cast[]> => {
    try {
        const { data, config } = await moviesApi.get<any>(`/movies/${id}/cast`, { params: { limit: 15 } });

        // support possible response shapes: array, { items: [] }, { cast: [] }
        let items: any[] = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data?.items)) items = data.items;
        else if (Array.isArray(data?.cast)) items = data.cast;
        else {
            console.warn('[getMovieCastAction] unexpected response shape', { url: `${config?.baseURL ?? ''}${config?.url ?? ''}`, data });
            return [];
        }

        const mapped = mapCastItemsToCastArray(items);
        return mapped;
    } catch (error: any) {
        console.error('[getMovieCastAction] error:', {
            message: error?.message,
            status: error?.response?.status,
            url: `${error?.config?.baseURL ?? ''}${error?.config?.url ?? ''}`,
            data: error?.response?.data,
        });
        throw error;
    }
};