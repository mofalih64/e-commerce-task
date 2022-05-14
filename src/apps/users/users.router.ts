import { Router } from 'express';
import * as usersController from './users.controller';
const router = Router();

router.get('/', usersController.getAllUsers);

// router.get('create', usersController.createuser);


export { router as userRouter };
