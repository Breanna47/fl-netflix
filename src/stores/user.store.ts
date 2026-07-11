import { User } from "@/types/user.types";
import { IMovie } from "@/types/movie.types";
import { create } from "zustand";
import axios from "axios";

type IState = {
  user: User | null;
  favorites: IMovie[];
};

type IActions = {
  updateUser: () => Promise<void>;
  updateFavorites: () => Promise<void>;
};

type IUserStoreState = IState & IActions;

const useUser = create<IUserStoreState>((set) => ({
  user: null,
  favorites: [],
  updateUser: async () => {
    const { data } = await axios.get("/api/me");
    const { currentUser } = data;
    set({ user: currentUser });
  },
  updateFavorites: async () => {
    const { data } = await axios.get("/api/favorites");
    set({ favorites: data.favorites });
  },
}));

export default useUser;
