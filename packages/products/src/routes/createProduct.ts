import { NextFunction, Request, Response, Router } from 'express';
import { Product, productDoc } from '../models/products';
import { ConflictError, ForbiddenException, UnAuthorizedException, payloadUser } from '../app';
import { verify } from 'jsonwebtoken';

const router = Router();



const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnAuthorizedException('need to be authenticated to access this resource');
    try {
      const decodedToken  = verify(token, process.env.JWT_SECRET_KEY!) as payloadUser;
      req.user = decodedToken
  
      next();
    } catch (error) {
      throw new UnAuthorizedException('invalid token');
    }
  
    
  } catch (error) {
    next(error);
  }


}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    next(new ForbiddenException('Only admins can access this route'));
  }
  next();

} 


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
 async (req: Request<{}, {}, createProductDto>, res: Response<createProductResponse>, next)=> {
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
    res.status(201).json({ product });
} catch (error) {
  next(error);
  
}
})


export { router  as createProductRoute };