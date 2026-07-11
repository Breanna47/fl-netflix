"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Sparkles, Star, Plus, Play } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/components/Dialog";

import MovieInfoModal from "./MovieInfoModal";

import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import useUser from "@/stores/user.store";

interface Props {
  isRecommendedMovieModalOpen: boolean;
  setIsRecommendedMovieModalOpen: (open: boolean) => void;
  recommendedMovie: IRecommendedMovie | null;
}

export default function RecommendedMovieModal({
  isRecommendedMovieModalOpen,
  setIsRecommendedMovieModalOpen,
  recommendedMovie,
}: Props) {
  const { user, updateUser, updateFavorites } = useUser();

  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const [showMovieModal, setShowMovieModal] = useState(false);

  const openMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const toggleFavorite = async (movie: IMovie) => {
    try {
      const isFavorite = user?.favorites.includes(movie._id) ?? false;

      if (isFavorite) {
        await axios.delete("/api/favorite", {
          data: {
            movieId: movie._id,
          },
        });
      } else {
        await axios.post("/api/favorite", {
          movieId: movie._id,
        });
      }

      await updateUser();
      await updateFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        open={isRecommendedMovieModalOpen}
        onOpenChange={() => setIsRecommendedMovieModalOpen(false)}
      >
        <DialogContent
          className="
            w-[85vw]
            max-w-[1500px]
            h-[88vh]
            bg-[#181818]
            border-none
            rounded-xl
            max-h-[90vh]
            overflow-hidden
            p-00
          "
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-3xl font-bold text-white">
              <Sparkles className="text-[#E50914]" />
              Recommended Movies
            </DialogTitle>

            <DialogDescription className="text-gray-400 text-base">
              {recommendedMovie?.reason}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 flex flex-col gap-6">
            {recommendedMovie?.recommendation?.length ? (
              recommendedMovie.recommendation.map((movie) => {
                const isFavorite = user?.favorites.includes(movie._id) ?? false;

                return (
                  <div
                    key={movie.id}
                    className="
          flex
          gap-6
          rounded-lg
          border
          border-[#333]
          bg-[#202020]
          hover:bg-[#2b2b2b]
          transition-all
          duration-300
          p-5
        "
                  >
                    <div className="relative w-[240px] h-[135px] shrink-0 overflow-hidden rounded">
                      <Image
                        src={movie.thumbnailUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {movie.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={16} className="fill-yellow-400" />

                            <span className="text-white">
                              {movie.rating.toFixed(1)}
                            </span>
                          </div>

                          <span className="rounded border border-[#666] px-2 py-1 text-xs text-gray-300">
                            {movie.duration}
                          </span>

                          {movie.genre && (
                            <span className="rounded bg-[#E50914] px-2 py-1 text-xs font-semibold text-white">
                              {movie.genre}
                            </span>
                          )}
                        </div>

                        <p className="mt-4 leading-7 text-gray-300">
                          {movie.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-4">
                        <button
                          onClick={() => openMovie(movie)}
                          className="
    flex
    items-center
    gap-2
    rounded
    bg-white
    px-5
    py-2
    font-semibold
    text-black
    transition
    hover:bg-gray-200
  "
                        >
                          <Play size={18} fill="black" />
                          Play
                        </button>

                        <button
                          onClick={() => openMovie(movie)}
                          className="
    rounded
    bg-[#E50914]
    px-5
    py-2
    font-semibold
    text-white
    transition
    hover:bg-[#c40812]
  "
                        >
                          Watch Trailer
                        </button>

                        <button
                          onClick={() => toggleFavorite(movie)}
                          className="
    flex
    items-center
    gap-2
    rounded-full
    border
    border-white
    px-4
    py-2
    text-white
    transition
    hover:bg-white/10
  "
                        >
                          <Plus size={18} />

                          {isFavorite ? "My List ✓" : "My List"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-gray-400">
                <p className="text-xl">No recommendations found.</p>

                <p className="mt-3">Try selecting different genres or moods.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <MovieInfoModal
        showInfoModal={showMovieModal}
        setShowInfoModal={setShowMovieModal}
        movieData={selectedMovie}
      />
    </>
  );
}
