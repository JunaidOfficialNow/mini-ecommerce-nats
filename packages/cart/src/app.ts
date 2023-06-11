import express , { Express } from 'express';
import { AddToCartRoute } from './routes/addToCart';
import cors from 'cors';
import logger from 'morgan'
import { getCartRoute } from './routes/getCart';
import { removeFromCartRoute } from './routes/removeFromCart';
import { PlaceOrderRoute } from './routes/placeOrder';
import { GlobalErrorHandler, NotFoundHandler } from 'jndminiecomcommon';

const app: Express = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.use(AddToCartRoute)
app.use(getCartRoute);
app.use(removeFromCartRoute);
app.use(PlaceOrderRoute);

app.use('*', NotFoundHandler)

app.use(GlobalErrorHandler)

export default app;