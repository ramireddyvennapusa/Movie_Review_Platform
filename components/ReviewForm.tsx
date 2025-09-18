
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import StarRating from './StarRating';

interface ReviewFormProps {
    movieId: number;
    onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const { addReview, user } = useAppContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && text.trim() !== '') {
            addReview({ movieId, rating, text });
            setRating(0);
            setText('');
            onSubmit();
        }
    };

    if (!user) {
        return (
            <div className="bg-brand-surface p-4 rounded-lg text-center">
                <p className="text-brand-text-muted">You must be logged in to leave a review.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-brand-surface p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-white">Write a Review</h3>
            <div>
                <label className="block text-brand-secondary mb-2">Your Rating</label>
                <StarRating rating={rating} setRating={setRating} />
            </div>
            <div>
                <label htmlFor="reviewText" className="block text-brand-secondary mb-2">Your Review</label>
                <textarea
                    id="reviewText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What did you think of the movie?"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-brand-primary focus:border-brand-primary transition"
                    rows={4}
                />
            </div>
            <button
                type="submit"
                disabled={rating === 0 || text.trim() === ''}
                className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
