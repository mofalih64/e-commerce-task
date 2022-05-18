import { Router } from 'express';
import passport from 'passport';
import * as usersController from './users.controller';
const router = Router();

router.get(
  '/',
  passport.authenticate('jwt-user', { session: false }),
  usersController.getUser
);

// router.get('create', usersController.createuser);

export { router as userRouter };
