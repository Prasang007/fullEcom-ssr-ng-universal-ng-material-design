import { Router } from 'express';
import ProductController from '../controllers/product-controller';
import SchemaValidator from '../validators/validator';
const router = Router();
const prdtCtrller = new ProductController();
router.get(('/'), prdtCtrller.getAllProducts, () => {} );
router.get(('/getProduct'), prdtCtrller.getProduct, () => {} );
router.post(('/add'), SchemaValidator.validate, prdtCtrller.createProduct, () => {} );
export default router;

