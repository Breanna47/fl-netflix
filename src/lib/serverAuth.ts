import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import { connectToDB } from "@/lib/db";



const serverAuth = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error("Unauthorized");
        }
        const currentUser = await User.findOne({ email: session.user?.email });
        if (!currentUser) {
            throw new Error("Unauthorized");
        }

        return { currentUser };
    } catch {
        throw new Error("Unauthorized");
    }
};

export default serverAuth;