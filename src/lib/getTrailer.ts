import axios from "axios";

interface TMDBVideo {
  key: string;
  site: string;
  type: string;
}

interface TMDBVideosResponse {
  results: TMDBVideo[];
}

export async function getTrailer(movieId: number): Promise<string | null> {
  try {
    const { data } = await axios.get<TMDBVideosResponse>(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    );

    const trailer =
      data.results.find(
        (video: TMDBVideo) =>
          video.site === "YouTube" && video.type === "Trailer",
      ) ?? data.results.find((video: TMDBVideo) => video.site === "YouTube");

    return trailer?.key ?? null;
  } catch (error) {
    console.error("Failed to load trailer:", error);
    return null;
  }
}
