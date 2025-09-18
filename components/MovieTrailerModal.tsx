
import React from 'react';

interface MovieTrailerModalProps {
  trailerKey: string;
  onClose: () => void;
}

const MovieTrailerModal: React.FC<MovieTrailerModalProps> = ({ trailerKey, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-brand-bg p-2 rounded-lg shadow-xl relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 text-white bg-brand-primary rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold z-10"
          aria-label="Close trailer"
        >
          &times;
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerModal;
