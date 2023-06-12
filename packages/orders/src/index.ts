import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from './app';
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./events/listeners/userCreated.listener";
import { ProductCreatedListener } from "./events/listeners/productCreated.listener";
import { OrderPlacedListener } from "./events/listeners/placeOrder.listener";
import { PaymentSuccessfulListener } from "./events/listeners/paymentSuccessful.listener";

dotenv.config();

 async function bootstrap() {
   await natsWrapper.connect('mini-ecommerce', process.env.CLIENT_ID!, process.env.NATS_URL!);
   await mongoose.connect(process.env.MONGO_URL!);
   natsWrapper.client.on("close", () => {
   console.log("NATS connetion closed!");
   process.exit();
});

  new UserCreatedListener(natsWrapper.client).listen();
  new ProductCreatedListener(natsWrapper.client).listen();
  new OrderPlacedListener(natsWrapper.client).listen();
  new PaymentSuccessfulListener(natsWrapper.client).listen();

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());
 app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
}

bootstrap().catch(console.log)
