
import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { fetchMovies } from '../services/mockApi';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
    const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true);
            try {
                const allMovies = await fetchMovies();
                setFeaturedMovies(allMovies.filter(m => m.featured));
                setTrendingMovies(allMovies.filter(m => m.trending));
            } catch (error) {
                console.error("Failed to fetch movies", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadMovies();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-12">
            <section>
                <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-primary pl-4">Featured Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {featuredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-primary pl-4">Trending Now</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {trendingMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
