import { Router } from "express";
import { Payment } from "../models/payments";
import { PaymentSuccessfulPublisher } from "../events/publisher/paymentSuccessfull.publisher";
import { natsWrapper } from "../nats-wrapper";
import { isAuthenticated } from "jndminiecomcommon";

const router = Router();


router.post('/api/v1/payments/:orderId', isAuthenticated,async(req, res, next)=> {

try {
    if (!req.body.success) {
      return res.json({ success: false, message: 'transaction failed'});
    }
    const order = await Payment.findOne({ orderId: req.params.orderId });
  
     if (order && order.paid) {
      order.paid = true;
     } 
     if (order && order.orderId) {
      new PaymentSuccessfulPublisher(natsWrapper.client).publish({orderId: order.orderId.toString()});
     }
  
     res.json({success: true, message: 'payement successful'});
} catch (error) {
  console.log(error);
  
}


})

export { router as PayRoute  };