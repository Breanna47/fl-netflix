"use client";
import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import MovieInfoModal from "./MovieInfoModal";
// https://api.themoviedb.org/3/movie/popular?api_key=8e8c7cc753f2303eefb719f72f56b12b

const Billboard = ({
  randomMovie,
  video,
}: {
  randomMovie: IMovie | null;
  video: any;
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.requestFullscreen();
    }
  };

  const handleOpenInfoModal = () => {
    setShowInfoModal(true);
  };


    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            const randomNum = Math.floor(Math.random() * data.length);
            setRandomMovie(data[randomNum]);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);


  return (
    <div className="h-screen relative flex">
      <img
        src={`https://image.tmdb.org/t/p/w500${randomMovie?.backdrop_path}`}
        alt={randomMovie?.title}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 
        transform flex flex-col gap-4"
      >
        <h1 className="text-5xl text-white font-bold">{randomMovie?.title}</h1>
        <div className="flex gap-2">
          <button
            className="text-lg font-semibold bg-white py-2 px-5 
                text-black rounded-sm cursor-pointer flex gap-4 hover:bg-[#ffffffbf]"
            onClick={handlePlayButtonClick}
          >
            <Image
              src="/assets/play.svg"
              width={24}
              height={24}
              alt="Play video"
            />
            Play
          </button>
          <button
            className="text-lg font-semibold bg-[#6d6d6eb3] py-2 px-5 
                text-black rounded-sm cursor-pointer flex gap-4 hover:bg-[#6d6d6e66]"
            onClick={handleOpenInfoModal}
          >
            <Image
              src="/assets/play.svg"
              width={24}
              height={24}
              alt="Play video"
            />
            More Info
          </button>
        </div>
      </div>
      {showInfoModal ? (
        <MovieInfoModal
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          movieData={randomMovie}
          movieVideoURL={
            video ? `https://www.youtube.com/embed/${video.key}` : null
          }
        />
      ) : null}
    </div>
  );
};

export default Billboard;