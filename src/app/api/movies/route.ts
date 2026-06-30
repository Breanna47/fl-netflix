import { connectToDB } from "@/lib/db";
import Movie from "@/models/Movies.";
import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
    try {
     await serverAuth();

        await connectToDB();

        const movies = await Movie.find({});
        
        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to fetch movies" },
            { status: 500 }
        );
    }
}