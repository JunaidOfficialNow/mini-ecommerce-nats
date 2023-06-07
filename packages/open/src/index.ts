import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

 async function bootstrap() {
 await mongoose.connect(process.env.MONGO_URL!);
 app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
}

bootstrap().catch(console.log)
