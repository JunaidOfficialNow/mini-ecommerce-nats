import { NextFunction, Request, Response, Router } from 'express';
import { Cart } from '../models/cart';

const router = Router();


router.post('/api/v1/users/:userId/carts', async (
  req: Request<{userId: string},{},{productId: string}>, 
  res: Response, 
  next: NextFunction
  ) => {
   try {
    const product = { productId: req.body.productId, quantity: 0}
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart?.products.length) {
      cart?.products.push(product);
      await cart?.save();
      res.json(product)
    } else {
       const index = cart.products.findIndex(p => p.productId?.toString() == req.body.productId);
      if (index == -1) {
        cart?.products.push(product);
        await cart?.save();
        res.json(product)
      } else {
        console.log('reaching');
        cart.products[index].quantity++
        await cart?.save();
        res.json(cart?.products[index]); 
        
      }
    }
      
   } catch (error) {
    console.log(error);
   }
} )
export { router as  AddToCartRoute };