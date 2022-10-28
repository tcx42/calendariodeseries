export default interface Configuration {
    images?: {
        base_url?: string,
        secure_base_url?: string,
        backdrop_sizes?: Array<string>,
        logo_sizes?: Array<string>,
        poster_sizes?: Array<string>,
        profile_sizes?: Array<string>,
        still_sizes?: Array<string>,
    }
    change_keys?: Array<string>
}