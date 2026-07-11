import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import axios from "axios";
import { mapTMDBMovie } from "@/lib/tmdb";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    await connectToDB();

    const user = await User.findOne({
      email: currentUser.email,
    });

    if (!user) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    const favoriteIds: string[] = user.favorites ?? [];

    const movies = await Promise.all(
      favoriteIds.map(async (favoriteId) => {
        try {
          // "tmdb-1339713" -> 1339713
          const tmdbId = favoriteId.replace("tmdb-", "");

          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          );

          return mapTMDBMovie(data);
        } catch {
          return null;
        }
      }),
    );

    return NextResponse.json(
      {
        favorites: movies.filter(Boolean),
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
