import { Router } from 'express';
import productController from '../controllers/product-controller';

const router = Router();

router.get(('/'), productController.getAllProducts );
router.get(('/getProduct'), productController.getProduct);
router.post(('/add'), productController.createProduct );
export default router;

