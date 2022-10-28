import { useEffect, useState } from "react";
import './css/mediaBrowser.css';
import Configuration from '../interfaces/Configuration';
import MoviesResponse from "../interfaces/MoviesResponse";
import TvshowsResponse from "../interfaces/TvshowsResponse";
import MediaTopNavbar from "./MediaTopNavbar";
import MediaBottomNavbar from "./MediaBottomNavbar";
import { Link } from "react-router-dom";
import { MediaType } from "../interfaces/MediaType";
import Poster from "./Poster";

interface Props {
    configuration: Configuration,
    mediaType: MediaType
}
export default function MediaBrowser(props: Props) {
    const [mediaData, setMediaData] = useState<MoviesResponse["results"] | TvshowsResponse["results"]>();
    const [option, setOption] = useState<string>('popular');
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [isSearch, setIsSearch] = useState<number>(0);

    function handleOptionButtonClick(option: string) {
        setOption(option);
        setPage(1);
        setIsSearch(0);
    }
    function handleSearchClick() {
        setPage(1);
        setIsSearch(isSearch + 1);
    }

    useEffect(() => {
        (async () => {
            const mediaData = await getMediaData(props.mediaType, isSearch, search, page, option);
            if (mediaData) {
                setMediaData(mediaData);
            }
        })();
    }, [option, page, isSearch, props]);

    return (
        <div>
            <MediaTopNavbar
                mediaType={props.mediaType}
                handleOptionButtonClick={handleOptionButtonClick}
                search={search}
                setSearch={setSearch}
                handleSearchClick={handleSearchClick}
            />
            <section className="movies-browser">
                {mediaData?.map((media, i) =>
                    <Link to={`/mediaDetails/${props.mediaType}?id=${media.id}`} className="movie-block" key={i}>
                        <Poster configuration={props.configuration} fileName={media.poster_path} />
                        <p>
                            {'title' in media ? media.title : 'name' in media ? media.name : undefined}
                        </p>
                    </Link>
                )}
            </section>
            <MediaBottomNavbar
                page={page}
                setPage={setPage}
            />
        </div>
    )
}
async function getMediaData(type: MediaType, isSearch: number, search: string, page: number, option: string): Promise<MoviesResponse['results'] | TvshowsResponse['results']> {
    if (type === 'movie') {
        var url = isSearch ?
            `http://localhost:4000/search/movie?query=${search}&page=${page}` :
            `http://localhost:4000/movie/${option}?page=${page}`;
    } else {
        var url = isSearch ?
            `http://localhost:4000/search/tv?query=${search}&page=${page}` :
            `http://localhost:4000/tv/${option}?page=${page}`;
    }
    return (await (await fetch(url)).json()).results;
}