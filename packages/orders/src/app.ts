import express , { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import { getOrdersRoute } from './routes/getOrders';
import { InitiatePaymentRoute } from './routes/initiatePayment';
import { GlobalErrorHandler, NotFoundHandler } from 'jndminiecomcommon';

const app: Express = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.use(getOrdersRoute);

app.use(InitiatePaymentRoute);

app.use('*', NotFoundHandler)

app.use(GlobalErrorHandler);




export default app;