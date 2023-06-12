import { Router } from 'express';
import { Cart } from '../models/cart';

const router = Router();

router.get('/api/v1/users/:userId/carts', async (req, res, next)=> {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart?.products);
  } catch (error) {
    console.log(error);
  }
})

export { router as getCartRoute };