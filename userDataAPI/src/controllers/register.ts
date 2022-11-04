import { Request, Response, NextFunction } from "express";
import config from "src/config";
import { MongoClient } from "mongodb";
import User from "src/User";
const mongoClient = new MongoClient(config.app.mongoConnectionURL);
export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User(req.body.name, req.body.email, req.body.password);
        await mongoClient.connect();
        const collection = mongoClient.db('cds').collection('users');
        const existingUser = await collection.findOne(
            { name: { $eq: req.body.email } },
            { projection: { email: '' } }
        );
        if (existingUser === null) {
            const insertedUser = await collection.insertOne(user);
            //ok go login now
        }
        //cover case email already in use
    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }

}