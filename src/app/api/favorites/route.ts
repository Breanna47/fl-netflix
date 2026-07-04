import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import Movie from "@/models/movie";
import User from "@/models/user";

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