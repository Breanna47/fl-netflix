"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "@/shared/components/Navbar";
import Billboard from "@/shared/components/Billboard";
import Movies from "@/shared/components/Movies";
import FavoriteList from "@/shared/components/FavoriteList";
import { mapTMDBMovie } from "@/lib/tmdb";
import { IMovie } from "@/types/movie.types";
import useUser from "@/stores/user.store";

export default function Home() {
  const { updateUser } = useUser();

  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        );

        const mappedMovies = data.results.map(mapTMDBMovie);

        if (!mappedMovies.length) return;

        setMovieList(mappedMovies);

        const random =
          mappedMovies[Math.floor(Math.random() * mappedMovies.length)];

        setRandomMovie(random);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />

      <Billboard randomMovie={randomMovie} />

      <Movies movies={movieList} label="Top Movies" />


      <FavoriteList />
    </div>
  );
}
