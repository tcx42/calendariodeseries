import * as dotenv from 'dotenv';
dotenv.config({debug: true});
const env = process.env.NODE_ENV || 'dev';
interface Config {
    app: {
        port: string | number,
        tmdbApiKey: string
    }
}
const dev: Config = {
    app: {
        port: process.env.PORT || 4000,
        tmdbApiKey: process.env.TMDB_API_KEY || ''
    }
}
const test: Config = {
    app: {
        port: process.env.PORT || 4000,
        tmdbApiKey: process.env.TMDB_API_KEY || ''
    }
}
const prod: Config = {
    app: {
        port: process.env.PORT || 4000,
        tmdbApiKey: process.env.TMDB_API_KEY || ''
    }
}
const config: { [key: string]: Config } = {
    dev, test, prod
}
export default config[env]