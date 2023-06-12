import { Request, Response, NextFunction } from "express";
import { ForbiddenException, HttpError, UnAuthorizedException } from "../errors/errors";
import { verify } from "jsonwebtoken";
import { payloadUser } from "..";


type ErrorResponse = {
  error: {
   status: number;
   message: string;
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnAuthorizedException('need to be authenticated to access this resource');
    try {
      const decodedToken  = verify(token, process.env.JWT_SECRET_KEY!) as payloadUser;
      req.user = decodedToken
  
      next();
    } catch (error) {
      throw new UnAuthorizedException('invalid token');
    }
  
    
  } catch (error) {
    next(error);
  }


}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    next(new ForbiddenException('Only admins can access this route'));
  }
  next();

} 

export const GlobalErrorHandler = (err: HttpError, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {

  let message = 'Internal Server Error';
  let status = 500;

  if (err instanceof HttpError) {
    message = err.message;
    status = err.status;
  }

  res.status(status).json({
    error: {
      message,
      status
    }
  })

};

export const NotFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({message: 'End point not found'});
}