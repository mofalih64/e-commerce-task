import { Router } from 'express';
import { authRouter } from './apps/auth/auth.router';
import { userRouter } from './apps/users/users.router';
import { cartRouter } from './apps/cart/cartRoute';

const router = Router();

router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/users', userRouter);

export default router;
