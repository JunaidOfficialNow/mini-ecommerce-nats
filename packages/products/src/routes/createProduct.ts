import { NextFunction, Request, Response, Router } from 'express';
import { Product, productDoc } from '../models/products';
import { ProductCreatedPublisher } from '../events/publishers/productCreated.publisher';
import { natsWrapper } from '../nats-wrapper';
import { ConflictError, ForbiddenException, UnAuthorizedException, isAdmin, isAuthenticated, payloadUser } from 'jndminiecomcommon';

const router = Router();




type createProductDto = {
  name: string;
  price: number;
}

type createProductResponse = {
  product: productDoc
}

router.post('/api/v1/products',
isAuthenticated,
isAdmin,
 async (req: Request<{}, {}, createProductDto>, res: Response<createProductResponse>, next: NextFunction)=> {
try {
    const { name, price } = req.body;
    let product;
    try {
      product = Product.build({ name, price });
      await product.save();
      
    } catch (error: any) {
      if (error.code == 11000) {
          throw new ConflictError('product already exists');
      }
      throw new Error(error);
    }
    new ProductCreatedPublisher(natsWrapper.client).publish({ name: product.name, price: product.price, isActive: product.isActive});
    res.status(201).json({ product });
} catch (error) {
  next(error);
  
}
})


export { router  as createProductRoute };