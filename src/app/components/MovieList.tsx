// READ
import Movie from "./Movie";
import { MovieType } from "../../../types/movie";

// 1. Hàm lấy dữ liệu từ TMDB (Chạy trên Server)

async function getMovies(){

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    // Gọi API lấy danh sách phim phổ biến
    const res = await fetch(    
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=vi-VN&page=1`,
    )

    if(!res){
        throw new Error("Can't take film list")
    }

    return res.json();

}


export default async function MovieList(){

    const data = await getMovies();
    const movies = data.results;
    
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {/* Loop for printing movie */}
            {movies.map((movie: MovieType) => (<Movie key={movie.id} data={movie}/>))}
        </div>
    )
}