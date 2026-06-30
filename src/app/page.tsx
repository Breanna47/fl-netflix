import Navbar from "@/shared/components/Navbar";
import Billboard from "@/shared/components/Billboard";
import MovieList from "@/shared/components/MovieList";

export default function Home() {
  return (
  <div>
    <Navbar />
    <Billboard />
    <MovieList />
  </div>
  );
}