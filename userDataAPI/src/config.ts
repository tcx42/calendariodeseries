import * as dotenv from 'dotenv';
dotenv.config({ debug: true });
const env = process.env.NODE_ENV || 'dev';
interface Config {
    app: {
        port: string | number,
        mongoConnectionURL: string,
        jwtSecretKey: string | undefined
    }
}
const dev: Config = {
    app: {
        port: process.env.PORT || 5000,
        mongoConnectionURL: process.env.MONGO_CONNECTION_URL || '',
        jwtSecretKey: process.env.JWTSECRETKEY
    }
}
const test: Config = {
    app: {
        port: process.env.PORT || 5000,
        mongoConnectionURL: process.env.MONGO_CONNECTION_URL || '',
        jwtSecretKey: process.env.JWTSECRETKEY
    }
}
const prod: Config = {
    app: {
        port: process.env.PORT || 5000,
        mongoConnectionURL: process.env.MONGO_CONNECTION_URL || '',
        jwtSecretKey: process.env.JWTSECRETKEY
    }
}
const config: { [key: string]: Config } = {
    dev, test, prod
}
export default config[env]