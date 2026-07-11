import { IMovie } from "@/types/movie.types";

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
}

export function mapTMDBMovie(movie: TMDBMovie): IMovie {
  return {
    id: movie.id,
    _id: `tmdb-${movie.id}`,

    title: movie.title,

    description: movie.overview || "No description available.",

    thumbnailUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : "/assets/no-image.jpg",

    videoUrl: "",

    trailerKey: undefined,

    genre: "",

    duration: "Unknown",

    rating: Number(movie.vote_average.toFixed(1)),

    mood: "",
  };
}
