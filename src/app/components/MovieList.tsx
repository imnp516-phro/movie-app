// READ
import Movie from "./Movie";

export default async function getMovies(){
    const movies = await getMovies();

    return(
        <div>
            {movies.map(m => <Movie key={m.id} data={m} />)}
        </div>
    )
}