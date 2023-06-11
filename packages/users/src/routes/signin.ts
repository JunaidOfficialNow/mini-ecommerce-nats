import { Request, Response, Router } from 'express';
import { User } from '../models/user';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NotFoundException, UnAuthorizedException } from 'jndminiecomcommon';
const router = Router();

type userSignInDTO = {
  email: string;
  password: string;
}

type userSignResponse = {
  access_token: string;
}

router.post('/api/v1/users/auth/login/', async (req: Request<{}, {}, userSignInDTO>, res: Response<userSignResponse>, next) => {
try {
  
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
  
    const isMatch = await compare(password, user.hashPassword);
    if (!isMatch) {
      throw new UnAuthorizedException('Password incorrect');
    }
  
    const token = sign({user, isAdmin: false}, process.env.JWT_SECRET_KEY!, { expiresIn:'2h'});
    res.json({ access_token: token});
} catch (error) {
  next(error);
}

})

export { router as userSignInRoute }