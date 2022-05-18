import { Router } from 'express';
import passport from 'passport';
import * as orderController from './order-controller';
import * as authController from '../auth/auth.contoller';

const router = Router();

router.post(
  '/create-order',
  authController.authorize,
  orderController.creatOrder
);

router.post('/check-out', authController.authorize, orderController.checkout);

export { router as orderRouter };
