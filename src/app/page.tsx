"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "@/shared/components/Navbar";
import Billboard from "@/shared/components/Billboard";
import Movies from "@/shared/components/Movies";
import MovieList from "@/shared/components/MovieList";
import FavoriteList from "@/shared/components/FavoriteList";
import { mapTMDBMovie } from "@/lib/tmdb";
import { IMovie } from "@/types/movie.types";
import useUser from "@/stores/user.store";

interface TMDBVideo {
  key: string;
  site: string;
  type: string;
}

export default function Home() {
  const { updateUser } = useUser();

  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [video, setVideo] = useState<TMDBVideo | null>(null);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

const mappedMovies = data.results.map(mapTMDBMovie);

        if (!mappedMovies.length) return;

        setMovieList(mappedMovies);

        const random =
          mappedMovies[
            Math.floor(Math.random() * mappedMovies.length)
          ];

        setRandomMovie(random);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${random.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        const trailer =
          response.data.results.find(
            (video: TMDBVideo) =>
              video.site === "YouTube" &&
              video.type === "Trailer"
          ) ??
          response.data.results[0] ??
          null;

        setVideo(trailer);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />

      <Billboard
        randomMovie={randomMovie}
        video={video}
      />

      <Movies
        movies={movieList}
        label="Top Movies"
      />

      <MovieList />

      <FavoriteList />
    </div>
  );
}