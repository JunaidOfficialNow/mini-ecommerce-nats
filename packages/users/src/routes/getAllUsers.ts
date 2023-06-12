import { Router} from 'express';
import { User } from '../models/user';
import { isAdmin, isAuthenticated } from 'jndminiecomcommon';
const router = Router();




router.get('/api/v1/users', isAuthenticated , isAdmin, async(req, res, next)=> {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error)
  }
})



export { router as getAllUsersRoute }