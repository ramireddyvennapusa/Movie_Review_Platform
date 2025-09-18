
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie } from '../types';
import { fetchWatchlistMovies } from '../services/mockApi';
import MovieCard from '../components/MovieCard';
import StarRating from '../components/StarRating';

const ProfilePage: React.FC = () => {
    const { user, reviews, watchlist, isLoading: isUserLoading } = useAppContext();
    const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
    const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);

    useEffect(() => {
        if (watchlist.length > 0) {
            const loadWatchlistMovies = async () => {
                setIsWatchlistLoading(true);
                try {
                    const movies = await fetchWatchlistMovies(watchlist);
                    setWatchlistMovies(movies);
                } catch (error) {
                    console.error("Failed to load watchlist movies", error);
                } finally {
                    setIsWatchlistLoading(false);
                }
            };
            loadWatchlistMovies();
        } else {
            setIsWatchlistLoading(false);
        }
    }, [watchlist]);

    if (isUserLoading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <div className="text-center text-2xl">Could not load user profile.</div>;
    }

    return (
        <div className="space-y-12">
            <section className="bg-brand-surface p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
                <img src={user.profile_picture} alt={user.username} className="w-32 h-32 rounded-full border-4 border-brand-primary" />
                <div>
                    <h1 className="text-4xl font-bold text-white">{user.username}</h1>
                    <p className="text-brand-text-muted">{user.email}</p>
                    <p className="text-brand-text-muted text-sm mt-2">Member since {new Date(user.join_date).toLocaleDateString()}</p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-primary pl-4">My Watchlist</h2>
                {isWatchlistLoading ? (
                    <LoadingSpinner />
                ) : watchlistMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {watchlistMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                ) : (
                    <p className="text-brand-text-muted">Your watchlist is empty.</p>
                )}
            </section>

            <section>
                <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-primary pl-4">My Reviews</h2>
                <div className="space-y-4">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="bg-brand-surface p-4 rounded-lg">
                                <div className="flex items-center space-x-4 mb-2">
                                    <StarRating rating={review.rating} size="sm" />
                                    <p className="font-bold text-white">Review for a movie</p> {/* In a real app, we'd link to the movie */}
                                </div>
                                <p className="text-brand-text-muted text-sm mb-2">{new Date(review.timestamp).toLocaleString()}</p>
                                <p className="text-white">{review.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-brand-text-muted">You haven't written any reviews yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
