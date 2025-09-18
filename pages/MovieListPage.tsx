
import React, { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types';
import { fetchMovies } from '../services/mockApi';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieListPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('');
    
    // In a real app, these would be dynamic
    const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller'];

    const loadMovies = useCallback(async () => {
        setIsLoading(true);
        try {
            const results = await fetchMovies({ query, genre });
            setMovies(results);
        } catch (error) {
            console.error("Failed to fetch movies", error);
        } finally {
            setIsLoading(false);
        }
    }, [query, genre]);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        loadMovies();
    };

    return (
        <div>
            <div className="bg-brand-surface p-6 rounded-lg mb-8">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="search" className="block text-sm font-medium text-brand-secondary mb-1">Search by Title</label>
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., Inception"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-brand-primary focus:border-brand-primary transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-brand-secondary mb-1">Genre</label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-brand-primary focus:border-brand-primary transition"
                        >
                            <option value="">All Genres</option>
                            {genres.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                </form>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h3 className="text-2xl font-bold text-white">No movies found</h3>
                    <p className="text-brand-text-muted mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default MovieListPage;
