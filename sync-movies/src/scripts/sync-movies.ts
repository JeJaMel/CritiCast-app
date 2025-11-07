import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { MovieDBMoviesResponse } from '../interfaces/moviedb-response';
import { MovieDBMDetailsResponse } from '../interfaces/moviedb-movie.response';
import { CreditResponse } from '../interfaces/credits-response';
import { CredditMapper } from '../mappers/creddits.mapper';
import { MovieMapper } from '../mappers/movie.mapper';

// Configuration and initialization 
dotenv.config();
const prisma = new PrismaClient();

const API_KEY = process.env.EXPO_PUBLIC_MOVIE_DB_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_DB_URL;

if (!API_KEY) {
    throw new Error('EXPO_PUBLIC_MOVIE_DB_KEY is not defined in the .env file');
}

type ListType = 'popular' | 'top_rated' | 'now_playing' | 'upcoming';

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
    const separator = endpoint.includes('?') ? '&' : '?';

    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: "Could not parse error body." }));
        console.error('TMDB API Error Response:', errorBody);
        throw new Error(`Failed to fetch from TMDB: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
}

// Sync logic
async function syncMovies(listType: ListType, page: number = 1) {
    console.log(`\n Starting movie sync for list: '${listType}', page: ${page}...`);

    const movieResponse = await fetchFromTMDB<MovieDBMoviesResponse>(`/movie/${listType}?page=${page}`);

    for (const movieSummary of movieResponse.results) {
        try {
            // Check if the movie already exists in our DB
            const movieInDb = await prisma.movie.findUnique({
                where: { id: movieSummary.id },
            });

            if (movieInDb) {
                console.log(`- Movie "${movieSummary.title}" (ID: ${movieSummary.id}) already exists. Skipping.`);
                continue; // Move to the next movie
            }

            console.log(`+ New movie found: "${movieSummary.title}" (ID: ${movieSummary.id}). Fetching details...`);

            // If it doesn't exist, fetch full details and credits concurrently
            const [detailsResponse, creditsResponse] = await Promise.all([
                fetchFromTMDB<MovieDBMDetailsResponse>(`/movie/${movieSummary.id}?language=en-US`),
                fetchFromTMDB<CreditResponse>(`/movie/${movieSummary.id}/credits`),
            ]);

            // Transform the data mappers
            const transformedMovie = MovieMapper.fromTheMovieDBToCompleteMovie(detailsResponse);
            const transformedCast = creditsResponse.cast
                .slice(0, 30) // Only take the top 30 actors
                .map(CredditMapper.fromTheMovieDBToCast);

            // Use a transaction to ensure all data is saved together
            await prisma.$transaction(async (tx) => {
                // Save the movie
                await tx.movie.create({
                    data: {
                        id: transformedMovie.id,
                        title: transformedMovie.title,
                        originalTitle: transformedMovie.originalTitle,
                        description: transformedMovie.description,
                        releaseDate: transformedMovie.releaseDate,
                        tmdbRating: transformedMovie.rating,
                        posterUrl: transformedMovie.poster,
                        backdropUrl: transformedMovie.backdrop,
                        genres: transformedMovie.genres,
                        durationMinutes: transformedMovie.duration,
                        budget: transformedMovie.budget,
                        productionCompanies: transformedMovie.productionCompanies,
                    },
                });

                // Save actors and link them to the movie
                for (const actor of transformedCast) {
                    await tx.actor.upsert({
                        where: { id: actor.id },
                        update: {
                            name: actor.name,
                            avatarUrl: actor.avatar,
                        },
                        create: {
                            id: actor.id,
                            name: actor.name,
                            avatarUrl: actor.avatar,
                        },
                    });

                    await tx.movieCast.create({
                        data: {
                            movieId: transformedMovie.id,
                            actorId: actor.id,
                            characterName: actor.character,
                        },
                    });
                }
            });

            console.log(`✅ Successfully saved "${transformedMovie.title}" and its cast.`);

            // delay
            await new Promise(res => setTimeout(res, 150));

        } catch (error) {
            console.error(`❌ Failed to process movie ID ${movieSummary.id} (${movieSummary.title}). Error:`, error);
        }
    }

    console.log(`\n🏁 Finished movie sync for list: '${listType}', page: ${page}.`);
}


// Script execution
async function main() {
    try {
        for (let i = 71; i <= 72; i++) {
            try {
                await syncMovies('popular', i);
                await syncMovies('top_rated', i);
                await syncMovies('now_playing', i);
                await syncMovies('upcoming', i);
            } catch (error) {
                console.error(`Error syncing page ${i}:`, error);
            }
        }
    } catch (error) {
        console.error("An unexpected error occurred during the main execution:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();


