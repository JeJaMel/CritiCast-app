import { MoviesUI } from "@/core/movies/interfaces/moviesUI.interface";

export const removeDuplicateMovies = (movies: MoviesUI[]): MoviesUI[] => {
    const seen = new Set<number>();
    return movies.filter(movie => {
        const isDuplicate = seen.has(movie.id);
        seen.add(movie.id);
        return !isDuplicate;
    });
};

