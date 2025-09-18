
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Review {
  id: number;
  userId: number;
  username: string;
  userProfilePic: string;
  rating: number;
  text: string;
  timestamp: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string[];
  release_year: number;
  director: string;
  cast: CastMember[];
  synopsis: string;
  poster_url: string;
  trailer_key: string; 
  avg_rating: number;
  reviews: Review[];
  trending: boolean;
  featured: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  join_date: string;
  reviews: Review[];
  watchlist: number[]; // array of movie IDs
}
