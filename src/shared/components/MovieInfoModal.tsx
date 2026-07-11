"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Dot } from "lucide-react";
import axios from "axios";
import { getTrailer } from "@/lib/getTrailer";
import { Dialog, DialogContent, DialogTitle } from "../ui/components/Dialog";

import { IMovie } from "@/types/movie.types";
import useUser from "@/stores/user.store";

interface IMovieInfoModalProps {
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
  movieData: IMovie | null;
}
const MovieInfoModal = ({
  showInfoModal,
  setShowInfoModal,
  movieData,
}: IMovieInfoModalProps) => {
  const { user, updateUser, updateFavorites } = useUser();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (!movieData) return;

    async function loadTrailer() {
      const key = await getTrailer(movieData!.id);
      console.log("Trailer key:", key);

      setTrailerKey(key);
    }

    loadTrailer();
  }, [movieData]);

  const isFavorite = user?.favorites.includes(movieData?._id ?? "") ?? false;

  const toggleFavorite = async () => {
    if (!movieData) return;

    try {
      if (isFavorite) {
        await axios.delete("/api/favorite", {
          data: {
            movieId: movieData._id,
          },
        });
      } else {
        await axios.post("/api/favorite", {
          movieId: movieData._id,
        });
      }

      await updateUser();
      await updateFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById(
      "movie-trailer",
    ) as HTMLIFrameElement | null;

    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <Dialog open={showInfoModal} onOpenChange={() => setShowInfoModal(false)}>
      <DialogTitle />

      <DialogContent className="bg-[#181818] border-none min-w-[700px] popupShadow p-0 overflow-hidden">
        <div className="flex flex-col w-full">
          {/* Trailer */}
          <div className="relative w-full h-[350px] bg-black">
            {trailerKey ? (
              <iframe
                id="movie-trailer"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&playsinline=1`}
                title={movieData?.title ?? "Movie Trailer"}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <Image
                src={movieData?.thumbnailUrl ?? ""}
                alt={movieData?.title ?? ""}
                fill
                className="object-cover"
              />
            )}

            <div className="absolute bottom-6 left-8 flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-white">
                {movieData?.title}
              </h1>

              <div className="flex gap-3">
                <button
                  onClick={handleFullscreen}
                  className="flex items-center gap-2 bg-white text-black font-bold px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition"
                >
                  <Image
                    src="/assets/play.svg"
                    width={20}
                    height={20}
                    alt="Play"
                  />
                  Play
                </button>

                <button
                  onClick={toggleFavorite}
                  className="border-2 border-white rounded-full p-2 hover:bg-white/10 transition"
                >
                  <Image
                    src={`/assets/${isFavorite ? "white-tick" : "plus"}.svg`}
                    width={20}
                    height={20}
                    alt="Favorite"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex flex-col gap-6 p-10">
            <div className="flex gap-2 items-center">
              <span
                className="
                  px-2
                  uppercase
                  whitespace-nowrap
                  text-[#bcbcbc]
                  text-sm
                  font-medium
                  border
                  border-[#fff6]
                "
              >
                U/A 13+
              </span>

              <span className="text-[#bcbcbc]">{movieData?.duration}</span>

              <span
                className="
                  text-[#bcbcbc]
                  border
                  border-[#fff6]
                  rounded
                  px-2
                  text-xs
                "
              >
                HD
              </span>

              <span className="text-green-400 font-semibold ml-2">
                ⭐ {movieData?.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-white leading-7">{movieData?.description}</p>

            <div className="flex items-center">
              <p className="text-white">{movieData?.genre}</p>

              <Dot className="text-gray-500" />

              <p className="text-white">{movieData?.mood}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieInfoModal;
