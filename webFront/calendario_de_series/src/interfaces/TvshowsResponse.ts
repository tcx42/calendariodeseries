export default interface TvshowsResponse {
    page?: number,
    results?: [{
        poster_path?: string | null,
        popularity?: number,
        id?: number,
        backdrop_path?: string | null,
        vote_average?: number,
        overview?: string,
        first_air_date?: string,
        origin_country?: Array<string>,
        genre_ids?: Array<number>,
        original_language?: string,
        vote_count?: number,
        name?: string,
        original_name?: string
    }]
    total_results?: number
    total_pages?: number
}