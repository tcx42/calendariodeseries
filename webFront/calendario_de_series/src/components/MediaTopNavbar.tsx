import { MediaType } from "../interfaces/MediaType"

interface Props {
    handleOptionButtonClick: Function,
    handleSearchClick: Function,
    setSearch: Function,
    search: string,
    mediaType: MediaType
}

export default function MediaTopNavbar(props: Props) {
    interface Option {
        query: string, display: string,
    }
    const movie: Option[] = [
        { query: 'popular', display: 'Popular' },
        { query: 'top_rated', display: 'Top Rated' },
        { query: 'upcoming', display: 'Upcoming' }]
    const tv: Option[] = [
        { query: 'popular', display: 'Popular' },
        { query: 'top_rated', display: 'Top Rated' },
        { query: 'on_the_air', display: 'On The Air' },
        { query: 'airing_today', display: 'Airing Today' }]
    const options: { [key: string]: Option[] } = {
        movie, tv
    }
    return (
        <nav>
            {options[props.mediaType].map((option: Option, i: number) => <button
                key={i}
                onClick={() => props.handleOptionButtonClick(option.query)}>
                {option.display}
            </button>)}
            <input
                type="text"
                id="search"
                name="search"
                onChange={(e) => props.setSearch(e.target.value)}
                onKeyDown={(k) => { if (k.key === 'Enter') { props.handleSearchClick() } }}
                value={props.search}>
            </input>
            <button onClick={() => props.handleSearchClick()}>Search</button>
        </nav>
    )
}