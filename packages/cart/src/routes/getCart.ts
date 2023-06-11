import { Router } from 'express';
import { Cart } from '../models/cart';
import { isAuthenticated } from 'jndminiecomcommon';

const router = Router();

router.get('/api/v1/carts/:userId/', isAuthenticated,async (req, res, next)=> {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart?.products);
  } catch (error) {
    next(error);
  }
})

export { router as getCartRoute };