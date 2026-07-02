"use client";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import { useState } from "react";
import MoviePopup from "./MoviePopup";


const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
    const [movieDate, setMovieData] = useState<IMovie | null>(null);
    const [movieId, setMovieId] = useState<string | null>(null);

const handleMouseEnter = (movie: IMovie, movieId: string) => {
    setMovieData(movie);
    setMovieId(movieId);
};

const handleMouseLeave = () => {
    setMovieId(null);
}

    return (   
         <div className="flex flex-col gap-2 realtive my-[3vw] px-[4%]"> 
    {movies.length ? (
        <h2 className="text-[#e5e5e5] font-medium text-xl">{label}</h2>
    ) : null} 
    <div className="flex gap-2"> 
        {movies.map((movie) => (
        <div key={movie._id} className="relative cursor-pointer">
            <div className="relative cursor-pointer w-[250px] h-[140px] 
            rounded-sm transition duration-300 ease in-out">
                <Image src={movie.thumbnailUrl} 
                className="object-cover" 
                alt={movie.title}
                fill
                />
            </div>
            {movie._id ===movieId ? <MoviePopup movie={movie} /> : null}
        </div>
        ))}
    </div>
    </div>
    
);

};

export default Movies;