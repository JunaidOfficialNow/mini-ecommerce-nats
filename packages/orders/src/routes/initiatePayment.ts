import { Router } from "express";
import { Order } from "../models/orders";
import { PaymentInitiatePublisher } from "../events/publisher/intiatePayment.publisher";
import { natsWrapper } from "../nats-wrapper";
import { isAuthenticated } from "jndminiecomcommon";

const router = Router();

router.post('/api/v1/orders/:orderId/payment', isAuthenticated,async (req, res, next)=> {
  try {
    const order = await Order.findOne({ _id: req.params.orderId });
    if (order) {
      new PaymentInitiatePublisher(natsWrapper.client).publish({
        userId: order?.userId,
        orderId: order?._id,
        amount: order?.totalAmount
      })
    }
    res.json({success: true, message: 'payment  initialized successfully'});
  } catch (error) {
    console.log(error);
  }
})

export { router as InitiatePaymentRoute };