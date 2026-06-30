"use client";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";


const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
    
    return (    <div className="flex flex-col gap-2 realtive my-[3vw] px-[4%]"> 
    {movies.length ? <h2>{label}</h2> : null} 
    <div className="flex gap-2"> 
        {movies.map((movie) => (
        <div key={movie._id}>
            <div className="relative cursor-pointer">
                <Image src={movie.thumbnailUrl} 
                className="object-cover" 
                alt={movie.title}
                fill
                />
            </div>
        </div>
        ))}
    </div>
    </div>
    
);

};

export default Movies;