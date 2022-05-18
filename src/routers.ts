import { Router } from 'express';
import { authRouter } from './apps/auth/auth.router';
import { userRouter } from './apps/users/users.router';
import { cartRouter } from './apps/cart/cartRoute';
import { orderRouter } from './apps/order/order-route';


const router = Router();

router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/users', userRouter);
router.use('/order', orderRouter);
export default router;
