import { nowPlayingAction } from "@/core/movies/actions/now-playing.action"
import { popularMoviesAction } from "@/core/movies/actions/popular.action"
import { topRatedMoviesAction } from "@/core/movies/actions/top-rated.action"
import { mostRecentAction } from "@/core/movies/actions/most-recent"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { removeDuplicateMovies } from "@/helpers/utils"

export const useMovies = () => {

    //Queries
    const nowPlayingQuery = useQuery({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: nowPlayingAction,
        staleTime: 1000 * 60 * 60 * 24, //24 hours
    })

    const popularQuery = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['movies', 'popular'],
        queryFn: ({ pageParam }) => { return popularMoviesAction({ page: pageParam }) },
        staleTime: 1000 * 60 * 60 * 24, //24 hours
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })

    const topRatedQuery = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['movies', 'topRated'],
        queryFn: ({ pageParam }) => { return topRatedMoviesAction({ page: pageParam }) },
        staleTime: 1000 * 60 * 60 * 24, //24 hours
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

    const upcomingQuery = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['movies', 'upcoming'],
        queryFn: ({ pageParam }) => mostRecentAction({ page: pageParam }),
        staleTime: 1000 * 60 * 60 * 24,
        getNextPageParam: (lastPage) => {
            // Esta lógica no cambia, sigue siendo correcta
            if (lastPage.items.length < 15) return undefined;
            return lastPage.page + 1;
        },

        // ¡AQUÍ ESTÁ LA SOLUCIÓN!
        // `select` transforma los datos DESPUÉS de que se reciben y ANTES de que se entreguen al componente.
        select: (data) => {
            // 1. Aplanamos todos los arrays de 'items' de todas las páginas en un solo gran array.
            const allMovies = data.pages.map(page => page.items).flat();

            // 2. Usamos nuestra función helper para limpiar los duplicados.
            const uniqueMovies = removeDuplicateMovies(allMovies);

            // 3. Devolvemos un objeto con la misma estructura que 'data', pero con los datos ya limpios.
            //    Envolvemos todas las películas únicas en una sola "mega-página".
            //    Esto simplifica enormemente el código en nuestro componente.
            return {
                pages: [{ items: uniqueMovies }],
                pageParams: data.pageParams,
            };
        },
    });

    return {
        nowPlayingQuery,
        popularQuery,
        topRatedQuery,
        upcomingQuery,
    }

}
