
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FilmIcon, UserCircleIcon } from './icons/Icons';
import { useAppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
    const { user } = useAppContext();
    const activeLinkClass = 'bg-brand-primary text-white';
    const inactiveLinkClass = 'text-brand-secondary hover:bg-brand-surface hover:text-white';

    return (
        <header className="bg-brand-bg shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <FilmIcon className="h-8 w-8 text-brand-primary" />
                    <span className="text-2xl font-bold text-white tracking-wider">MovieHub</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/movies"
                        className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                    >
                        {user?.profile_picture ? (
                            <img src={user.profile_picture} alt={user.username} className="h-6 w-6 rounded-full" />
                        ) : (
                            <UserCircleIcon className="h-6 w-6" />
                        )}
                        <span>Profile</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
