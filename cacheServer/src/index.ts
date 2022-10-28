import express, { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import cors from 'cors';
import config from './config';
import axios from 'axios';
// const axios = require('axios').default;

const app = express();
const router = express.Router();
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());
    next();
})

const cache = new NodeCache();

router.get('*', async (req: Request, res: Response) => {
    const base_url = 'https://api.themoviedb.org/3';
    const cacheKey = `${req.path}${JSON.stringify(req.query)}`;
    const params = {
        params: { ...req.query, api_key: config.app.tmdbApiKey }
    };
    try {
        if (cache.has(cacheKey)) {
            console.log('CACHE' + cacheKey)
            //CONSOLE
            return res.json(cache.get(cacheKey));
        }
        //CONSOLE
        console.log('TMDB' + cacheKey)
        const { data } = await axios.get(base_url + req.path, params);
        cache.set(cacheKey, data);
        return res.json(data);
    } catch (error) {
        //MUST CHANGE THIS
        return res.json(error);
    }
})

app.use(express.json());
app.use(router);
app.listen(config.app.port, () => { console.log('running...') });
