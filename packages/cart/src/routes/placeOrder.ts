import { Router } from "express";
import { Cart } from "../models/cart";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedListener } from "../events/listeners/OrderCreated.listener";
import { Message } from "node-nats-streaming";
import { PlaceOrderPublisher } from "../events/publisher/placeOrder.publisher";
import { OrderPlacedEvent, Subjects, isAuthenticated } from "jndminiecomcommon";

const router = Router();

router.post('/api/v1/carts/:userId/orders', isAuthenticated,async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId}) as any;
    const toPublishData: OrderPlacedEvent['data'] = {
      cart: cart,
      created: false,
      maxTimeToCreate: Date.now() + 5000,
      replyTo: Subjects.OrderCreated,
    }
     new PlaceOrderPublisher(natsWrapper.client).publish(toPublishData);
    //  const subscription = new OrderCreatedListener(natsWrapper.client).customListen();
    //  subscription.on('message', (msg: Message)=> {
    //   const data = JSON.parse(msg.getData().toString());
    //   console.log(data);
    //   if (data.success) {
    //     res.json({success: true, message: 'order created successfully'});
    //     res.end();
    //   } else {
    //     res.json({success: false, message: 'order service has some error internally'});
    //     res.end();
    //   }
    //   msg.ack();
    // })
   res.json({ success: true, message: 'order created'});
  } catch (error) {
    next(error)
  }
})

export { router as PlaceOrderRoute };