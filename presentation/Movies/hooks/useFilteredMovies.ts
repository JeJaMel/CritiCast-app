import { useInfiniteQuery } from "@tanstack/react-query";
import { getFilteredMoviesAction } from "@/core/movies/actions/get-filtered-movies.action";
import { MovieFilters } from "@/core/movies/interfaces/filters.interface";

export const useFilteredMovies = (filters: MovieFilters) => {

    const filteredMoviesQuery = useInfiniteQuery({
        queryKey: ['movies', 'filtered', filters],
        initialPageParam: 1,

        queryFn: ({ pageParam }) => {
            return getFilteredMoviesAction({ page: pageParam, filters });
        },

        getNextPageParam: (lastPage) => {
            if (lastPage.items.length < 15) return undefined;
            return lastPage.page + 1;
        },
    });

    return {
        filteredMoviesQuery,
    }
}