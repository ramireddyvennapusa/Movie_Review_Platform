
import { Movie, User } from '../types';

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    release_year: 2010,
    director: 'Christopher Nolan',
    cast: [
      { id: 1, name: 'Leonardo DiCaprio', character: 'Cobb', profile_path: 'https://picsum.photos/id/1005/200/300' },
      { id: 2, name: 'Joseph Gordon-Levitt', character: 'Arthur', profile_path: 'https://picsum.photos/id/1012/200/300' },
      { id: 3, name: 'Elliot Page', character: 'Ariadne', profile_path: 'https://picsum.photos/id/1027/200/300' },
    ],
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_url: 'https://picsum.photos/id/10/400/600',
    trailer_key: 'YoHD9XEInc0',
    avg_rating: 4.8,
    reviews: [
      { id: 1, userId: 2, username: 'JaneDoe', userProfilePic: 'https://picsum.photos/id/1011/100/100', rating: 5, text: 'Mind-bending and visually stunning!', timestamp: '2023-10-26T10:00:00Z' },
      { id: 2, userId: 3, username: 'BobSmith', userProfilePic: 'https://picsum.photos/id/1013/100/100', rating: 4, text: 'A bit complex, but rewarding.', timestamp: '2023-10-25T14:30:00Z' },
    ],
    trending: true,
    featured: true,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: ['Action', 'Crime', 'Drama'],
    release_year: 2008,
    director: 'Christopher Nolan',
    cast: [
        { id: 4, name: 'Christian Bale', character: 'Bruce Wayne', profile_path: 'https://picsum.photos/id/201/200/300' },
        { id: 5, name: 'Heath Ledger', character: 'Joker', profile_path: 'https://picsum.photos/id/202/200/300' },
    ],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_url: 'https://picsum.photos/id/20/400/600',
    trailer_key: 'EXeTwQWrcwY',
    avg_rating: 4.9,
    reviews: [],
    trending: true,
    featured: false,
  },
    {
    id: 3,
    title: 'Parasite',
    genre: ['Thriller', 'Comedy', 'Drama'],
    release_year: 2019,
    director: 'Bong Joon Ho',
    cast: [
        { id: 6, name: 'Song Kang-ho', character: 'Kim Ki-taek', profile_path: 'https://picsum.photos/id/301/200/300' },
        { id: 7, name: 'Lee Sun-kyun', character: 'Park Dong-ik', profile_path: 'https://picsum.photos/id/302/200/300' },
    ],
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    poster_url: 'https://picsum.photos/id/30/400/600',
    trailer_key: '5xH0HfJHsaY',
    avg_rating: 4.6,
    reviews: [
      { id: 3, userId: 1, username: 'CinephileChris', userProfilePic: 'https://picsum.photos/id/237/100/100', rating: 5, text: 'A masterpiece of modern cinema.', timestamp: '2023-11-01T12:00:00Z' },
    ],
    trending: false,
    featured: true,
  },
   {
    id: 4,
    title: 'The Grand Budapest Hotel',
    genre: ['Adventure', 'Comedy', 'Drama'],
    release_year: 2014,
    director: 'Wes Anderson',
    cast: [
        { id: 8, name: 'Ralph Fiennes', character: 'M. Gustave', profile_path: 'https://picsum.photos/id/401/200/300' },
        { id: 9, name: 'Tony Revolori', character: 'Zero Moustafa', profile_path: 'https://picsum.photos/id/402/200/300' },
    ],
    synopsis: 'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    poster_url: 'https://picsum.photos/id/40/400/600',
    trailer_key: '1Fg5iWmQjwk',
    avg_rating: 4.4,
    reviews: [],
    trending: true,
    featured: false,
  },
   {
    id: 5,
    title: 'Spider-Man: Into the Spider-Verse',
    genre: ['Animation', 'Action', 'Adventure'],
    release_year: 2018,
    director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
    cast: [
        { id: 10, name: 'Shameik Moore', character: 'Miles Morales (voice)', profile_path: 'https://picsum.photos/id/501/200/300' },
        { id: 11, name: 'Jake Johnson', character: 'Peter B. Parker (voice)', profile_path: 'https://picsum.photos/id/502/200/300' },
    ],
    synopsis: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    poster_url: 'https://picsum.photos/id/50/400/600',
    trailer_key: 'g4Hbz2jLxvQ',
    avg_rating: 4.7,
    reviews: [],
    trending: true,
    featured: true,
  },
];

const MOCK_USER: User = {
  id: 1,
  username: 'CinephileChris',
  email: 'chris@example.com',
  profile_picture: 'https://picsum.photos/id/237/200/200',
  join_date: '2023-01-15T09:00:00Z',
  reviews: [
    { id: 3, userId: 1, username: 'CinephileChris', userProfilePic: 'https://picsum.photos/id/237/100/100', rating: 5, text: 'A masterpiece of modern cinema.', timestamp: '2023-11-01T12:00:00Z' }
  ],
  watchlist: [2, 4],
};


const simulateDelay = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), 500));

export const fetchMovies = async (filters: { query?: string; genre?: string; year?: number; rating?: number } = {}): Promise<Movie[]> => {
  let movies = MOCK_MOVIES;
  if (filters.query) {
    movies = movies.filter(m => m.title.toLowerCase().includes(filters.query!.toLowerCase()));
  }
  if (filters.genre) {
    movies = movies.filter(m => m.genre.includes(filters.genre!));
  }
  if (filters.year) {
    movies = movies.filter(m => m.release_year === filters.year);
  }
  if (filters.rating) {
    movies = movies.filter(m => m.avg_rating >= filters.rating!);
  }
  return simulateDelay(movies);
};

export const fetchMovieById = async (id: number): Promise<Movie | undefined> => {
  const movie = MOCK_MOVIES.find(m => m.id === id);
  return simulateDelay(movie);
};

export const fetchUserProfile = async (id: number): Promise<User> => {
    // In a real app, you'd fetch a specific user. Here we return the mock user.
    return simulateDelay(MOCK_USER);
};

export const fetchWatchlistMovies = async (watchlist: number[]): Promise<Movie[]> => {
    const movies = MOCK_MOVIES.filter(m => watchlist.includes(m.id));
    return simulateDelay(movies);
};
