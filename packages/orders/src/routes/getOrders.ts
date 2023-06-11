import { Router } from "express";
import { Order } from "../models/orders";
import { isAuthenticated } from "jndminiecomcommon";

const router = Router();

router.get('/api/v1/orders/:userId', isAuthenticated,async( req, res, next)=> {
  try {
    const orders = await Order.findOne({userId: req.params.userId});
    res.json(orders);
    
  } catch (error) {
    console.log(error);
    
  }
})

export { router as getOrdersRoute };