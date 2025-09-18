
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-surface mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-brand-text-muted">
                <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
                <p className="text-sm mt-1">
                    A demonstration project by a world-class frontend React engineer.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
