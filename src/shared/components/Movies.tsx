"use client";
import Image from "next/image";
import { IMovie } from "@/types/movie.types";
import { useState } from "react";
import MoviePopup from "./MoviePopup";
import MovieInfoModal from "./MovieInfoModal";

interface MoviesProps {
  movies: IMovie[];
  label: string;
}

const Movies = ({ movies, label }: MoviesProps) => {
  const [movieData, setMovieData] = useState<IMovie | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleMouseEnter = (movie: IMovie) => {
    setMovieData(movie);
    setMovieId(movie._id);
  };

  const handleMouseLeave = () => {
    setMovieId(null);
  };

  const handleOpenInfoModal = () => {
    setMovieId(null);
    setShowInfoModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 relative my-[3vw] px-[4%]">
        {movies.length > 0 && (
          <h2 className="text-[#e5e5e5] font-medium text-xl">{label}</h2>
        )}

        <div className="flex gap-2 overflow-x-auto">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative w-[250px] h-[140px]
                rounded-sm overflow-hidden transition duration-300 ease-in-out"
              >
                <Image
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>

              {movie._id === movieId && (
                <MoviePopup
                  movie={movie}
                  handleOpenInfoModal={handleOpenInfoModal}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showInfoModal && (
        <MovieInfoModal
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          movieData={movieData}
        />
      )}
    </>
  );
};

export default Movies;
