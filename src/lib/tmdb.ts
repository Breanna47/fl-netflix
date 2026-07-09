import { IMovie } from "@/types/movie.types";

export function mapTMDBMovie(movie: any): IMovie {
  return {
    id: movie.id,
    _id: `tmdb-${movie.id}`,

    title: movie.title,
    description: movie.overview ?? "No description available.",

    thumbnailUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,

    videoUrl: "",

    genre: "Movie",
    duration: "N/A",
    rating: movie.vote_average,
    mood: "",
  };
}