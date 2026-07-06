import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import Movie from "@/models/movie";
import User from "@/models/user";
// https://api.themoviedb.org/3/movie/popular?api_key=8e8c7cc753f2303eefb719f72f56b12b



export async function GET() {

    try{
        const {currentUser} = await serverAuth();
        await connectToDB();

        const user = await User.findOne({
             email: currentUser.email }).populate("favorites");

return NextResponse.json({ favorites: user.favorites }, { status: 200 });
            } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" },
            { status: 500 }
        );
    }
}