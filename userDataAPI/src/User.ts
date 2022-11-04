import { createHash } from 'crypto';
export default class User {
    private name: string;
    private email: string;
    private hashedPassword: string;
    private movies: {
        movieId: number,
        watched: boolean
    }[];
    private shows: {
        showId: number,
        seasons?: {
            seasonNumber: number,
            watched: boolean,
            episodes?: {
                episodeNumber: number,
                watched: boolean
            }[]
        }[]
    }[]
    constructor(name: string, email: string, password: string, movies: User['movies'] = [], shows: User['shows'] = []) {
        this.name = name;
        this.email = email;
        this.hashedPassword = this.hashPassword(password);
        this.movies = movies;
        this.shows = shows;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    validatePassword(password: string) {
        return this.hashedPassword === this.hashPassword(password);
    }
    private hashPassword(password: string) {
        return createHash('sha256').update(password).digest('base64');
    }
    addMovie(movieId: number) {
        if (!this.movies.some(movie => movie.movieId === movieId)) {
            this.movies.push({
                movieId: movieId,
                watched: false
            })
        }
    }
    markMovieAsWatched(movieId: number) {
        const movie = this.movies.find(movie => movie.movieId === movieId)
        if (movie) {
            movie.watched = true
        }
    }
    addShow(showId: number) {
        if (!this.shows.some(show => show.showId === showId)) {
            this.shows.push({
                showId: showId
            })
        }
    }
    markSeasonAsWatched(showId: number, seasonNumber: number) {
        let season = this.shows.find(show =>
            show.showId === showId)?.seasons?.find(season =>
                season.seasonNumber === seasonNumber);
        if (season) {
            season = {
                seasonNumber: seasonNumber,
                watched: true
            }
        }
    }
    markEpisodeAsWatched(showId: number, seasonNumber: number, episodeNumber: number) {
        const episode = this.shows.find(show =>
            show.showId === showId)?.seasons?.find(season =>
                season.seasonNumber === seasonNumber)?.episodes?.find(episode =>
                    episode.episodeNumber === episodeNumber);
        if (episode) {
            episode.watched = true
        }
    }
}