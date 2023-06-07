import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { ForbiddenException, UnAuthorizedException, payloadUser } from '../app';
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

router.get('/api/v1/users', isAuthenticated , isAdmin, async(req, res, next)=> {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error)
  }
})



export { router as getAllUsersRoute }