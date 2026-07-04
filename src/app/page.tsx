"use client";

import Navbar from "@/shared/components/Navbar";
import Billboard from "@/shared/components/Billboard";
import { useState, useEffect } from "react";
import axios from "axios";
import { IMovie } from "@/types/movie.types";
import Movies from "@/shared/components/Movies";
import useUser from "@/stores/user.store";
import MovieList from "@/shared/components/MovieList";
import FavoriteList from "@/shared/components/FavoriteList";

export default function Home() {

const { updateUser } = useUser();

useEffect(() => {
  updateUser();
}, [updateUser]);

  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=8e8c7cc753f2303eefb719f72f56b12b",
        );
        const randomNum = Math.floor(Math.random() * data.results.length);
        setMovieList(data.results);
        setRandomMovie(data.results[randomNum]);
        if (
          data.results[randomNum] === undefined ||
          data.results[randomNum] === null
        )
          return;

        console.log("this ran");
        getRandomMovieVideoURL(data.results[randomNum].id);
      } catch (error) {
        console.log(error);
      }
    };
    async function getRandomMovieVideoURL(movieId: number) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8e8c7cc753f2303eefb719f72f56b12b`,
      );
      const movieVideo = response.data.results[0];
      setVideo(movieVideo);
    }

    fetchMovies();
  }, []);
  return (
    <div>
      <Navbar />
      <Billboard randomMovie={randomMovie} video={video} />
      <Movies movies={movieList} label="Top Movies" />
      <MovieList />
      <FavoriteList/>
    </div>
  );
}