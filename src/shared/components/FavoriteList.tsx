import useUser from "@/stores/user.store";
import { useEffect } from "react";
import Movies from "./Movies";

const FavoriteList = () => {
    const {favorites, updateFavorites} = useUser()
    
    useEffect(() => {
        updateFavorites();
    }, [updateFavorites]);

  console.log("Favorites:", favorites);



    return (
    <div className="pb-16">
        <Movies movies={favorites} label="My List" />
    </div>
    );
};

export default FavoriteList;