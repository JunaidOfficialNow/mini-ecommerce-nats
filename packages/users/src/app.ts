import express , { Express, NextFunction, Request, Response } from 'express';
import { CreateUserRoute } from './routes/createUser';
import cors from 'cors';
import logger from 'morgan';
import { userSignInRoute } from './routes/signin';
import { adminLoginRoute } from './routes/adminSignin';
import { verify } from 'jsonwebtoken';
import { getAllUsersRoute } from './routes/getAllUsers';

const app: Express = express();




app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

if (!process.env.PRODUCTION) {
  app.use(logger('dev'));
}

class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }


}


type ErrorResponse = {
   error: {
    status: number;
    message: string;
   }
}


app.get('/', (req, res)=> res.json({success: true}));

const GlobalErrorHandler = (err: HttpError, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {

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

const NotFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({message: 'End point not found'});
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message || 'Conflict', 409)
  } 
}

export class NotFoundException extends HttpError {
  constructor(message: string) {
    super( message || 'Not found', 404);
  }
}

export class UnAuthorizedException extends HttpError {
  constructor(message: string) {
    super(message || 'unauthorized', 401);
  }
}

export class ForbiddenException extends HttpError {
  constructor(message: string) {
    super(message || 'Forbidden', 403)
  }
}

export type payloadUser = {user?: any, isAdmin: boolean};

declare global {
  namespace Express {
    interface Request {
      user?: payloadUser;
    }
  }
}



app.use(CreateUserRoute);
app.use(userSignInRoute);
app.use(adminLoginRoute);
app.use(getAllUsersRoute)

app.use('*', NotFoundHandler);

app.use(GlobalErrorHandler);


export default app;