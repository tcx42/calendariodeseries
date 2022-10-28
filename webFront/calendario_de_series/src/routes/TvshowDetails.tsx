import { useEffect, useState } from "react"
import Poster from "../components/Poster";
import Configuration from "../interfaces/Configuration";
import TvshowDetailsResponse from "../interfaces/MovieDetailsResponse";

interface Props {
    configuration: Configuration
}
export default function TvshowDetails(props: Props) {
    const [tvshowId, setTvshowId] = useState<any>(queryParams('id'));
    const [tvshowData, setTvshowData] = useState<TvshowDetailsResponse>();
    useEffect(() => {
        (async () => {
            setTvshowData(await (await fetch(`http://localhost:4000/tv/${tvshowId}`)).json());
        })()
    }, [])

    return (
        <>
            <Poster configuration={props.configuration} fileName={tvshowData?.poster_path} />
            <p>{tvshowId}</p>
        </>
    )
}

function queryParams(query: string) {
    return new URLSearchParams(window.location.search).get(query);
}