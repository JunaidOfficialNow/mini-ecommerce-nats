import { Router } from 'express';
import { Product } from '../models/products';
const router = Router();

router.get('/api/v1/products', async (req, res, next)=> {
  const products = await Product.find({});
  res.json(products);
})

export { router as getAllProductRoute }