export default interface SeasonResponse {
    _id?: string,
    air_date?: string,
    episodes: {
        air_date?: string,
        episode_number?: number,
        crew?: {
            department?: string,
            job?: string,
            credit_id?: string,
            adult?: boolean | null,
            gender?: number,
            id?: number,
            known_for_department?: string,
            name?: string,
            original_name?: string,
            popularity?: number,
            profile_path?: string | null,
        }
        guest_stars?: {
            credit_id?: string,
            order?: number,
            character?: string,
            adult?: boolean,
            gender?: number | null,
            id?: number,
            known_for_department?: string,
            name?: string,
            original_name?: string,
            popularity?: number,
            profile_path?: string | null
        }
        id?: number,
        name?: string,
        overview?: string,
        production_code?: string,
        season_number?: number,
        still_path?: string,
        vote_average?: number,
        vote_count?: number
    }[]
    name?: string,
    overview?: string,
    id?: number,
    poster_path?: string | null,
    season_number?: number,
}