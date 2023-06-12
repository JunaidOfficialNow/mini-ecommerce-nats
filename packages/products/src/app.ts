import express , { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import { createProductRoute } from './routes/createProduct';
import { getAllProductRoute } from './routes/getAllProducts';
import { GlobalErrorHandler, NotFoundHandler } from 'jndminiecomcommon';

const app: Express = express();




app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.use(createProductRoute);
app.use(getAllProductRoute)

if (!process.env.PRODUCTION) {
  app.use(logger('dev'));
}


app.get('/', (req, res)=> res.json({success: true}));

app.use('*', NotFoundHandler);

app.use(GlobalErrorHandler);


export default app;