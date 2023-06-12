import express , { Express, NextFunction, Request, Response } from 'express';
import { CreateUserRoute } from './routes/createUser';
import cors from 'cors';
import logger from 'morgan';
import { userSignInRoute } from './routes/signin';
import { adminLoginRoute } from './routes/adminSignin';
import { getAllUsersRoute } from './routes/getAllUsers';
import { GlobalErrorHandler, NotFoundHandler } from 'jndminiecomcommon';
const app: Express = express();




app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

if (!process.env.PRODUCTION) {
  app.use(logger('dev'));
}


app.get('/', (req, res)=> res.json({success: true}));





app.use(CreateUserRoute);
app.use(userSignInRoute);
app.use(adminLoginRoute);
app.use(getAllUsersRoute)

app.use('*', NotFoundHandler);

app.use(GlobalErrorHandler);


export default app;