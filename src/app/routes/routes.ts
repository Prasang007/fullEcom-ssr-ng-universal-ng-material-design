import { Router } from 'express';
import product from './product-routes';
import shared from './shared-routes';
import order from './order-routes';
import user from './user-routes';
const routes = Router();

routes.use('/api/products', product);
routes.use('/api/shared', shared );
routes.use('/api/orders', order);
routes.use('/api/users', user);
export default routes;
