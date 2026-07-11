"use client";

import { useState } from "react";
import Image from "next/image";
import { IMovie } from "@/types/movie.types";
import MovieInfoModal from "./MovieInfoModal";

interface BillboardProps {
  randomMovie: IMovie | null;
}
const Billboard = ({ randomMovie }: BillboardProps) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!randomMovie) return null;

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src={randomMovie.thumbnailUrl}
          alt={randomMovie.title}
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        {/* Movie Content */}
        <div
          className="
            absolute
            top-1/2
            left-[4%]
            -translate-y-1/2
            flex
            flex-col
            gap-5
            max-w-2xl
            z-10
          "
        >
          <h1 className="text-white text-6xl font-bold drop-shadow-lg">
            {randomMovie.title}
          </h1>

          <p className="text-white text-lg leading-7 line-clamp-4">
            {randomMovie.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setShowInfoModal(true)}
              className="
                flex items-center gap-2
                bg-white
                text-black
                font-semibold
                px-6
                py-3
                rounded
                hover:bg-gray-200
                transition
              "
            >
              <Image src="/assets/play.svg" alt="Play" width={24} height={24} />
              Play
            </button>

            <button
              onClick={() => setShowInfoModal(true)}
              className="
                flex items-center gap-2
                bg-gray-500/70
                text-white
                font-semibold
                px-6
                py-3
                rounded
                hover:bg-gray-500
                transition
              "
            >
              <Image
                src="/assets/down-arrow.svg"
                alt="More Info"
                width={24}
                height={24}
              />
              More Info
            </button>
          </div>
        </div>
      </div>

      <MovieInfoModal
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        movieData={randomMovie}
      />
    </>
  );
};

export default Billboard;
