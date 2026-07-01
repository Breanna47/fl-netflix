import { connectToDB } from "@/lib/db";
import Movie from "@/models/Movies.";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const movies = await Movie.find({});
    console.log("Movies found:", movies.length);

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log("Movies API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}