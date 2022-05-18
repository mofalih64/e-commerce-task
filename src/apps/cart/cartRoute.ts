import { Router } from 'express';
import passport from 'passport';
import * as cartController from './cartController';
import * as authController from '../auth/auth.contoller';
import { createsession } from '../../utils/utils';

const router = Router();

router.post(
  '/create-cart',
  authController.authorize,
  cartController.createCart
);

router.get('/get-cart', authController.authorize, cartController.getCart);

router.get(
  '/increase-quantity/:id',
  passport.authenticate('jwt-user', { session: false }),
  cartController.increaseItemQuantity
);

router.get(
  '/decrease-quantity/:id',
  passport.authenticate('jwt-user', { session: false }),
  cartController.decreaseItemQuantity
);

// router.get(
//     '/', cartController.getCarts
// );
export { router as cartRouter };
