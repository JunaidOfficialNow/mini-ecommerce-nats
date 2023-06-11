import express , { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import { PayRoute } from './routes/pay';
import { GlobalErrorHandler, NotFoundHandler } from 'jndminiecomcommon';

const app: Express = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.use(PayRoute);

app.use('*', NotFoundHandler);
app.use(GlobalErrorHandler);


export default app;