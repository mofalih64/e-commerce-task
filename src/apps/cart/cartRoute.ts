import { Router } from 'express';
import * as cartController from './cartController';
// import { createsession } from '../../utils/utils'

const router = Router();

router.post(
    '/create-cart', cartController.addtocart
);


// router.get(
//     '/', cartController.getCarts
// );
export { router as cartRouter };
