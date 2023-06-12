import { Router } from 'express';
import { Cart } from '../models/cart';

const router =  Router();

router.delete('/api/v1/users/:userId/carts/:productId', async (req, res, next)=> {
  try {

    const cart  = await Cart.findOne({ userId: req.params.userId });
    if ( cart && cart.products ) {
      cart.products = cart.products.filter(product => product.productId.toString()!== req.params.productId)
      await cart.save();
      res.json(cart.products);
    }
  } catch (error) {
    console.log(error);
  }

})

export { router as removeFromCartRoute }