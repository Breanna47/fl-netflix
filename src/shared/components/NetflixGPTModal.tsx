"use client";

import { useState } from "react";
import axios from "axios";
import { Film } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/components/Dialog";

import { Slider } from "../ui/components/Slider";
import { Badge } from "../ui/components/Badge";

import { GENRES, MOODS } from "@/constants";

import RecommendedMovieModal from "./RecommendedMovieModal";

import { IRecommendedMovie } from "@/types/movie.types";

interface INetflixGPTModalProps {
  isNetflixGPTModalOpen: boolean;
  setIsNetflixGPTModalOpen: (isOpen: boolean) => void;
}

const NetflixGPTModal = ({
  isNetflixGPTModalOpen,
  setIsNetflixGPTModalOpen,
}: INetflixGPTModalProps) => {
  const [rating, setRating] = useState<number[]>([6]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const [recommendedMovie, setRecommendedMovie] =
    useState<IRecommendedMovie | null>(null);

  const [loading, setLoading] = useState(false);

  const [isRecommendedMovieModalOpen, setIsRecommendedMovieModalOpen] =
    useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    );
  };

  const handleRecommendMovie = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/recommendations", {
        genres: selectedGenres,
        moods: selectedMoods,
        rating: rating[0],
      });

      console.log("Recommendations:", data);

      setRecommendedMovie(data);
      setIsRecommendedMovieModalOpen(true);
    } catch (error) {
      console.error("Recommendation Error:", error);

      alert("Unable to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isNetflixGPTModalOpen}
        onOpenChange={() => setIsNetflixGPTModalOpen(false)}
      >
        <DialogContent
          className="
            bg-[#181818]
            border-none
            max-w-2xl
            text-white
            gap-8
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                flex
                items-center
                gap-2
                text-2xl
                font-bold
              "
            >
              <Film className="text-[#E50914]" />
              Find Your Perfect Movie
            </DialogTitle>

            <DialogDescription className="text-gray-400">
              Select your favorite genres and moods to discover movies
              you&apos;ll love.
            </DialogDescription>
          </DialogHeader>

          {/* Rating */}

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium">Minimum Rating</span>

              <span className="text-gray-400">{rating[0].toFixed(1)}</span>
            </div>

            <Slider
              value={rating}
              min={1}
              max={10}
              step={0.5}
              onValueChange={setRating}
            />
          </div>

          {/* Mood */}

          <div className="flex flex-col gap-3">
            <label className="font-medium">Mood</label>

            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => (
                <Badge
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`
                    cursor-pointer
                    border
                    transition-all
                    duration-200

                    ${
                      selectedMoods.includes(mood)
                        ? "bg-[#E50914] border-[#E50914] text-white shadow-lg scale-105"
                        : "bg-transparent border-[#555] text-[#B3B3B3] hover:border-white hover:text-white"
                    }
                  `}
                >
                  {mood}
                </Badge>
              ))}
            </div>
          </div>

          {/* Genres */}

          <div className="flex flex-col gap-3">
            <label className="font-medium">Genres</label>

            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <Badge
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`
                    cursor-pointer
                    border
                    transition-all
                    duration-200

                    ${
                      selectedGenres.includes(genre)
                        ? "bg-[#E50914] border-[#E50914] text-white shadow-lg scale-105"
                        : "bg-transparent border-[#555] text-[#B3B3B3] hover:border-white hover:text-white"
                    }
                  `}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setIsNetflixGPTModalOpen(false)}
              className="
                px-5
                py-2
                rounded-md
                border
                border-[#444]
                hover:bg-[#2b2b2b]
                transition
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleRecommendMovie}
              className="
                px-6
                py-2
                rounded-md
                bg-[#E50914]
                hover:bg-red-700
                disabled:opacity-60
                transition
              "
            >
              {loading ? "Finding Movies..." : "Generate Recommendations"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RecommendedMovieModal
        isRecommendedMovieModalOpen={isRecommendedMovieModalOpen}
        setIsRecommendedMovieModalOpen={setIsRecommendedMovieModalOpen}
        recommendedMovie={recommendedMovie}
      />
    </>
  );
};

export default NetflixGPTModal;
