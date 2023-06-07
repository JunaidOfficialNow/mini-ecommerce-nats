import { Request, Response, Router } from 'express';
import { UnAuthorizedException } from '../app';
import { sign } from 'jsonwebtoken';
const router = Router();


type adminLoginDTO = {
  email: string;
  password: string;
}

type adminLoginRespose = {
  access_token: string;
}


router.post('/api/v1/auth/admin/login', (req: Request<{}, {}, adminLoginDTO>, res: Response<adminLoginRespose>, next)=> {

try {
    const { email, password } = req.body;
    if (email  !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
      throw new UnAuthorizedException('Invalid credentials');
    }
    const token = sign({ isAdmin: true }, process.env.JWT_SECRET_KEY!, {expiresIn: '2h'});
    res.json({ access_token: token });
} catch (error) {
  next(error);
}
})
 

export { router as adminLoginRoute }