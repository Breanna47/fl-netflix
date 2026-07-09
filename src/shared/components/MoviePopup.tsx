import { useMemo } from "react";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import useUser from "@/stores/user.store";
import axios from "axios";

interface MoviePopupProps {
  movie: IMovie;
  handleOpenInfoModal: () => void;
}

const MoviePopup = ({
  movie,
  handleOpenInfoModal,
}: MoviePopupProps) => {
const {
  user,
  updateUser,
  updateFavorites,
} = useUser();

  const isFavorite = useMemo(() => {
    return user?.favorites.includes(movie._id) ?? false;
  }, [user, movie._id]);

  const toggleFavorites = async () => {
  try {
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

    // Refresh Zustand from the server
    await updateUser();
    await updateFavorites();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div
      className="
        absolute
        -left-8
        -top-15
        z-10
        w-80
        overflow-hidden
        rounded-md
        bg-[#181818]
        popupShadow
        transform
        scale-75
        hover:scale-100
        hover:-translate-y-6
        transition-transform
        duration-300
      "
    >
      {/* Movie Backdrop */}
      <div className="relative w-full h-[180px]">
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Future Trailer Support
          Fetch:
          /movie/${movie.id}/videos

          Then embed:
          https://www.youtube.com/embed/${trailerKey}
      */}

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              className="
                bg-white
                rounded-full
                p-2
                cursor-pointer
                transition hover:scale-110
              "
            >
              <Image
                src="/assets/play.svg"
                width={20}
                height={20}
                alt="Play"
              />
            </button>

            <button
              onClick={toggleFavorites}
              className="
                bg-[#2a2a2a99]
                border-2
                border-[#ffffff80]
                rounded-full
                p-2
                hover:bg-[#ffffff1a]
                transition hover:scale-110
              "
            >
              <Image
                src={`/assets/${
                  isFavorite ? "white-tick" : "plus"
                }.svg`}
                width={20}
                height={20}
                alt="Favorite"
              />
            </button>
          </div>

          <button
            onClick={handleOpenInfoModal}
            className="
              bg-[#2a2a2a99]
              border-2
              border-[#ffffff80]
              rounded-full
              p-2
            "
          >
            <Image
              src="/assets/down-arrow.svg"
              width={24}
              height={24}
              alt="More Info"
            />
          </button>
        </div>

        <h3 className="text-white font-bold text-lg">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
          <span className="text-green-400 font-semibold">
            ⭐{" "}
            {typeof movie.rating === "number"
              ? movie.rating.toFixed(1)
              : "N/A"}
          </span>

          <span>{movie.duration}</span>

          <span className="border border-gray-500 px-1 rounded">
            HD
          </span>
        </div>

        <p className="text-gray-300 text-sm mt-3 line-clamp-3">
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default MoviePopup;