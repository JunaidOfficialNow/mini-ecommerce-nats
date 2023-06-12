import express , { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import { PayRoute } from './routes/pay';

const app: Express = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.use(PayRoute);




export default app;