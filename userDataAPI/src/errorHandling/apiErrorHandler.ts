import { Request, Response, NextFunction } from "express";
import ApiError from "./ApiError";
export function apiErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
        return res.status(error.code).json(error.message);
    }
    return res.status(500).json('Internal server error.');
}