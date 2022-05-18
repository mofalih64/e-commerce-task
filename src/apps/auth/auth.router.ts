import { Router } from 'express';
import passport from 'passport';
import * as authController from './auth.contoller';
import * as usersController from '../users/users.controller';

const router = Router();
// crate user then give him a token
router.post('/login', usersController.userExist, authController.login);

router.post('/signup', usersController.createuser, authController.signup);
router.patch('/create-account', usersController.createAccount);
export { router as authRouter };
