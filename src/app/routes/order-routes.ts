import { Router } from 'express';
import orderController from '../controllers/order-controller';

const router = Router();

router.post(('/create'), orderController.createOrder );
router.get(('/getOrders'), orderController.getAllOrders );
router.get(('/getMyOrders'), orderController.getMyOrder );
router.get(('/getOrder'), orderController.getOrder );
router.put(('/changeStatus'), orderController.changeStatus );
// router.delete(('/:id'), orderController.deleteOrder );
export default router;

