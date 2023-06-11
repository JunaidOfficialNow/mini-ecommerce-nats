import { Router } from 'express';
import { Cart } from '../models/cart';
import { isAuthenticated } from 'jndminiecomcommon';

const router =  Router();

router.delete('/api/v1/carts/:userId/:productId', isAuthenticated,async (req, res, next)=> {
  try {

    const cart  = await Cart.findOne({ userId: req.params.userId });
    if ( cart && cart.products ) {
      cart.products = cart.products.filter(product => product.productId.toString() !== req.params.productId)
      await cart.save();
      res.json(cart.products);
    }
  } catch (error) {
    next(error);
  }

})

export { router as removeFromCartRoute }