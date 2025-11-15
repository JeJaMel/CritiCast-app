export interface MovieFilters {
    sortBy?: 'tmdb_rating' | 'release_date' | 'user_rating' | 'title';
    tmdbRatingFrom?: number;
    genres?: string; 
}