import { CompletedMovie } from "@/sync-movies/src/interfaces/movie.interface";
import { MoviesUI } from "../interfaces/moviesUI.interface";

const placeholderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s';

const safeTmdbUrl = (path?: any): string => {
    if (!path) return placeholderImage;
    const p = String(path).trim();
    if (p === 'null' || p === '/null' || p.endsWith('null')) return placeholderImage;
    return `https://image.tmdb.org/t/p/w500${p}`;
};

const mapApiMovieToMoviesUI = (apiMovie: any): MoviesUI => {
    return {
        id: apiMovie.id,
        title: apiMovie.title,
        description: apiMovie.description,
        poster: safeTmdbUrl(apiMovie.poster_url),
        backdrop: safeTmdbUrl(apiMovie.backdrop_url),
        rating: apiMovie.tmdb_rating ?? apiMovie.rating,
        user_rating: apiMovie.user_rating ?? null,
        releaseDate: apiMovie.release_date ? new Date(apiMovie.release_date) : (apiMovie.releaseDate ?? null),
    } as MoviesUI;
};

export const mapApiMovieToCompletedMovie = (apiMovie: any): CompletedMovie => {
    return {
        ...mapApiMovieToMoviesUI(apiMovie),
        genres: apiMovie.genres ?? apiMovie.genre_names ?? [],
        user_rating: apiMovie.user_rating ?? apiMovie.userRating ?? null,
        duration: Number(apiMovie.runtime ?? apiMovie.duration ?? 0),
        budget: Number(apiMovie.budget ?? 0),
        originalTitle: apiMovie.original_title ?? apiMovie.originalTitle ?? '',
        productionCompanies: (apiMovie.production_companies ?? []).map((c: any) => c.name ?? c),
    };
};

export const mapApiMoviesToMoviesUI = (items: any[] = []): MoviesUI[] => {
    return items.map(mapApiMovieToMoviesUI);
};
