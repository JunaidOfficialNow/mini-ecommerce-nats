import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { UserDTO } from '../utils/types/userDTO';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictError } from '../app';

const router: Router = Router();

router.post('/api/v1/users', async (req: Request<{}, {}, UserDTO>, res: Response, next: NextFunction)=> {
try {
     const { name, email, password  } = req.body;
     const hashPassword = await hash(password, 10);
     let user;
   try {
       user = User.build({name, email, hashPassword});
       await user.save();
   } catch (error: any) {
       if (error.code == 11000) {
        throw new ConflictError('email already in use');
       }
       throw new Error(error);
    }
     const token =  jwt.sign({user, isAdmin: false}, process.env.JWT_SECRET_KEY!, { expiresIn: '2h'});
     res.status(201).json({access_token: token, user});
} catch (error) {
  next(error);
}
})


export { router as CreateUserRoute };