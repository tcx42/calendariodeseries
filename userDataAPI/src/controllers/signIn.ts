import { Request, Response, NextFunction } from "express";
import config from "src/config";
import { MongoClient } from "mongodb";
const mongoClient = new MongoClient(config.app.mongoConnectionURI);
export default async function (req: Request, res: Response, next: NextFunction) {

    try {
        await mongoClient.connect();
        const collection = mongoClient.db('cds').collection('users');
        const result = await collection.insertOne({});
    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }

}