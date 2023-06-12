import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/errors";
type ErrorResponse = {
    error: {
        status: number;
        message: string;
    };
};
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const GlobalErrorHandler: (err: HttpError, req: Request, res: Response<ErrorResponse>, next: NextFunction) => void;
export declare const NotFoundHandler: (req: Request, res: Response) => void;
export {};
