
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Review } from '../types';
import { fetchUserProfile } from '../services/mockApi';

interface AppContextType {
  user: User | null;
  watchlist: number[];
  reviews: Review[];
  addToWatchlist: (movieId: number) => void;
  removeFromWatchlist: (movieId: number) => void;
  addReview: (review: Omit<Review, 'id' | 'userId' | 'username' | 'userProfilePic' | 'timestamp'> & { movieId: number }) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserProfile(1); // Fetch mock user with ID 1
        setUser(userData);
        setWatchlist(userData.watchlist);
        setReviews(userData.reviews);
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  const addToWatchlist = (movieId: number) => {
    if (!watchlist.includes(movieId)) {
      setWatchlist(prev => [...prev, movieId]);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(id => id !== movieId));
  };

  const addReview = (review: Omit<Review, 'id' | 'userId' | 'username' | 'userProfilePic' | 'timestamp'> & { movieId: number }) => {
    if (!user) return;
    const newReview: Review = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      userProfilePic: user.profile_picture,
      rating: review.rating,
      text: review.text,
      timestamp: new Date().toISOString(),
    };
    // In a real app, this would also be associated with the movie ID
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, watchlist, reviews, addToWatchlist, removeFromWatchlist, addReview, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
