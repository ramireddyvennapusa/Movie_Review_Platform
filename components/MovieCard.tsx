
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { StarIcon } from './icons/Icons';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="block group bg-brand-surface rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="relative">
                <img src={movie.poster_url} alt={movie.title} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute top-2 right-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <StarIcon className="w-4 h-4 mr-1"/>
                    {movie.avg_rating.toFixed(1)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-brand-text truncate group-hover:text-brand-primary transition-colors">{movie.title}</h3>
                <p className="text-sm text-brand-text-muted">{movie.release_year}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
