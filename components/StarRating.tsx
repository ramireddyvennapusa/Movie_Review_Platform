
import React from 'react';
import { StarIcon as StarIconSolid } from './icons/Icons';
import { StarIcon as StarIconOutline } from './icons/Icons';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, size = 'md' }) => {
  const stars = [1, 2, 3, 4, 5];
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => setRating && setRating(star)}
          onMouseEnter={() => setRating && setRating(star)}
          disabled={!setRating}
          className={`cursor-${setRating ? 'pointer' : 'default'} text-yellow-400`}
        >
          {star <= rating ? 
            <StarIconSolid className={sizeClasses[size]} /> : 
            <StarIconOutline className={`${sizeClasses[size]} text-gray-500`} />
          }
        </button>
      ))}
    </div>
  );
};

export default StarRating;
