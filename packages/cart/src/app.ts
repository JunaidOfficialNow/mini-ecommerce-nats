import express , { Express } from 'express';
import { AddToCartRoute } from './routes/addToCart';
import cors from 'cors';
import logger from 'morgan'
import { getCartRoute } from './routes/getCart';
import { removeFromCartRoute } from './routes/removeFromCart';

const app: Express = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.use(AddToCartRoute)
app.use(getCartRoute);
app.use(removeFromCartRoute);


export default app;