import NextAuth from "next-auth";
import { authOptions } from "./option";

export const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;