import { NextRequest, NextResponse } from "next/server";

import { mapTMDBMovie } from "@/lib/tmdb";

const GENRE_MAP: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  TVMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { genres, rating } = body;

    const genreIds = genres
      .map((genre: string) => GENRE_MAP[genre])
      .filter(Boolean);

    const url = new URL("https://api.themoviedb.org/3/discover/movie");

    url.searchParams.set("api_key", process.env.NEXT_PUBLIC_TMDB_API_KEY!);

    url.searchParams.set("sort_by", "popularity.desc");

    url.searchParams.set("vote_average.gte", rating.toString());

    url.searchParams.set("vote_count.gte", "100");

    if (genreIds.length > 0) {
      url.searchParams.set("with_genres", genreIds.join(","));
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("TMDB request failed");
    }

    const data = await response.json();

    const recommendation = data.results.slice(0, 10).map(mapTMDBMovie);

    return NextResponse.json(
      {
        recommendation,
        reason:
          recommendation.length > 0
            ? "These recommendations match your selected genres and minimum rating."
            : "No movies matched your filters.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Recommendation API Error:", error);

    return NextResponse.json(
      {
        recommendation: [],
        reason: "Something went wrong while fetching recommendations.",
      },
      { status: 500 },
    );
  }
}
