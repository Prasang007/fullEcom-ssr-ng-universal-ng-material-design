import { Router } from 'express';
import ProductController from '../controllers/product-controller';

const router = Router();
const prdtCtrller = new ProductController();
router.get(('/'), prdtCtrller.getAllProducts, () => {} );
router.get(('/getProduct'), prdtCtrller.getProduct, () => {} );
// router.post(('/add'), prdtCtrller.createProduct );
export default router;

