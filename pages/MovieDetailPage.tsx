
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types';
import { fetchMovieById } from '../services/mockApi';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { useAppContext } from '../contexts/AppContext';
import { PlusIcon, CheckIcon, PlayIcon } from '../components/icons/Icons';
import MovieTrailerModal from '../components/MovieTrailerModal';

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const movieData = await fetchMovieById(parseInt(id));
                setMovie(movieData || null);
            } catch (error) {
                console.error("Failed to fetch movie details", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    if (isLoading) return <LoadingSpinner />;
    if (!movie) return <div className="text-center text-2xl">Movie not found.</div>;

    const isInWatchlist = watchlist.includes(movie.id);

    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    return (
        <div className="space-y-12">
            {showTrailer && <MovieTrailerModal trailerKey={movie.trailer_key} onClose={() => setShowTrailer(false)} />}
            
            {/* Movie Header */}
            <section className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <img src={movie.poster_url} alt={movie.title} className="rounded-lg shadow-2xl w-full" />
                </div>
                <div className="md:w-2/3 text-white">
                    <h1 className="text-5xl font-extrabold mb-2">{movie.title}</h1>
                    <div className="flex items-center space-x-4 text-brand-text-muted mb-4">
                        <span>{movie.release_year}</span>
                        <span>&bull;</span>
                        <span>{movie.genre.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-6">
                        <StarRating rating={movie.avg_rating} size="md" />
                        <span className="text-xl font-bold">{movie.avg_rating.toFixed(1)}</span>
                    </div>
                    <p className="text-lg mb-6">{movie.synopsis}</p>
                    <p><strong className="text-brand-secondary">Director:</strong> {movie.director}</p>
                    <div className="mt-8 flex space-x-4">
                        <button
                            onClick={() => setShowTrailer(true)}
                            className="flex items-center justify-center bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                           <PlayIcon className="w-6 h-6 mr-2" /> Watch Trailer
                        </button>
                        <button
                            onClick={handleWatchlistToggle}
                            className={`flex items-center justify-center font-bold py-3 px-6 rounded-lg transition-colors ${
                                isInWatchlist 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-brand-surface hover:bg-gray-700 text-white'
                            }`}
                        >
                            {isInWatchlist ? <CheckIcon className="w-6 h-6 mr-2" /> : <PlusIcon className="w-6 h-6 mr-2" />}
                            {isInWatchlist ? 'On Watchlist' : 'Add to Watchlist'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Cast Section */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movie.cast.map(member => (
                        <div key={member.id} className="text-center">
                            <img src={member.profile_path || 'https://picsum.photos/200/300'} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-2" />
                            <p className="font-bold text-white">{member.name}</p>
                            <p className="text-sm text-brand-text-muted">{member.character}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-4">Reviews</h2>
                    <div className="space-y-6">
                        {movie.reviews.map(review => (
                            <div key={review.id} className="bg-brand-surface p-4 rounded-lg flex space-x-4">
                                <img src={review.userProfilePic} alt={review.username} className="w-12 h-12 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-4 mb-1">
                                        <p className="font-bold text-white">{review.username}</p>
                                        <StarRating rating={review.rating} size="sm" />
                                    </div>
                                    <p className="text-brand-text-muted text-sm mb-2">{new Date(review.timestamp).toLocaleDateString()}</p>
                                    <p>{review.text}</p>
                                </div>
                            </div>
                        ))}
                        {movie.reviews.length === 0 && <p className="text-brand-text-muted">No reviews yet. Be the first!</p>}
                    </div>
                </div>
                <div>
                    <ReviewForm movieId={movie.id} onSubmit={() => alert('Review submitted!')} />
                </div>
            </section>
        </div>
    );
};

export default MovieDetailPage;
