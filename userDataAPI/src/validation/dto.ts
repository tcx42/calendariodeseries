import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import ApiError from '../errorHandling/ApiError';

export const loginReqSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
});
export const registerReqSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
});

export function validateDto(schema: Yup.AnySchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validBody = await schema.validate(req.body);
            req.body = validBody;
            next();
        } catch (error) {
            next(new ApiError(400, 'Bad request'))
        }
    }
}