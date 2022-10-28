import { useEffect, useState } from "react"
import Poster from "../components/Poster";
import Configuration from "../interfaces/Configuration";
import MovieDetailsResponse from "../interfaces/MovieDetailsResponse";

interface Props {
    configuration: Configuration
}
export default function MovieDetails(props: Props) {
    const [movieId, setMovieId] = useState<any>(queryParams('id'));
    const [movieData, setMovieData] = useState<MovieDetailsResponse>();
    useEffect(() => {
        (async () => {
            setMovieData(await (await fetch(`http://localhost:4000/movie/${movieId}`)).json());
        })()
    }, [])

    return (
        <>
            <Poster configuration={props.configuration} fileName={movieData?.poster_path} />
            <p>{movieId}</p>
        </>
    )
}

function queryParams(query: string) {
    return new URLSearchParams(window.location.search).get(query);
}