import { Request, Response, NextFunction } from "express";
import config from "src/config";
import { MongoClient } from "mongodb";
import jwt from 'jsonwebtoken';
import ApiError from "src/errorHandling/ApiError";
export default async function (req: Request, res: Response, next: NextFunction) {
    const mongoClient = new MongoClient(config.app.mongoConnectionURI);
    try {
        await mongoClient.connect();
        const collection = mongoClient.db('cds').collection('users');
        const result = await collection.findOne(
            { name: { $eq: req.body.email } },
            { projection: { _id: 0, name: '', password: '' } }
        );
        if (!result) {
            throw new ApiError(404, 'User not found');
        }
        //validate password
        if (!config.app.jwtSecretKey) {
            throw ApiError.missingJWTKey();
        }
        jwt.sign(result, config.app.jwtSecretKey)
        //return jwt
    } catch (error) {
        next(error);
    } finally {
        await mongoClient.close();
    }
}