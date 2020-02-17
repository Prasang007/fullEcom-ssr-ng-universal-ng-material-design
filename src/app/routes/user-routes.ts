import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();
router.get(('/'), userController.getAllusers );
router.get(('/getUserBy'), userController.getUserBy );
router.get(('/verificationEmailcheck'), userController.verficationEmailCheck );
router.post(('/emailForgotPsd'), userController.emailForgotPsd);
router.post(('/checkPassword'), userController.checkPassword);
router.put(('/change-password'), userController.changePassword );
router.put(('/updateTotalOrder'), userController.updateTotalOrder );
router.put(('/updateCart'), userController.updateCart );
router.put(('/updateName'), userController.updateName );
export default router;

