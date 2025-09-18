
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-9xl font-extrabold text-brand-primary tracking-widest">404</h1>
            <div className="bg-white text-brand-bg px-2 text-sm rounded rotate-12 absolute" style={{top: '40%', left: '50%', transform: 'translate(-50%, -50%) rotate(-12deg)'}}>
                Page Not Found
            </div>
            <p className="text-2xl font-light text-brand-text-muted mt-4">
                Sorry, we couldn't find the page you're looking for.
            </p>
            <Link
                to="/"
                className="mt-8 inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
