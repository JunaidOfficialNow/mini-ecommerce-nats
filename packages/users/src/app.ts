import express , { Express } from 'express';

const app: Express = express();


app.use(express.json());
app.use(express.urlencoded());


export default app;