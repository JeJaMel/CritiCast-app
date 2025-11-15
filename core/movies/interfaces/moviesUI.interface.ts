export interface MoviesUI {
    id: number;
    title: string;
    description: string;
    poster: string;
    backdrop: string;
    rating: number;
    user_rating: number | null;
    releaseDate: Date;
}