import { auth } from "@/auth";
import User from "@/models/user";
import { connectToDB } from "./db";

const serverAuth = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await connectToDB();

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return { currentUser };
};

export default serverAuth;