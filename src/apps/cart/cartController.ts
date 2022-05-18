import { Prisma, PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
import type { Response, Request } from 'express';
import { authorize } from '../auth/auth.contoller';
import { getToken } from '../auth/auth.service';

export const getCart = async (req: Request, res: Response) => {
  const user = req.user as User;
  console.log(user);

  try {
    let userCart = await prisma.item.findMany({
      where: {
        ordered: false,
        userId: user.id,
      },
    });

    if (userCart.length == 0) {
      res.status(200).json({
        message: 'there is no items in your cart',
      });
    } else {
      res.status(200).json({
        data: userCart,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const user = (await req.user) as User;

    const un_ordred_items = await prisma.item.findMany({
      where: {
        userId: user.id,
        ordered: false,
      },
    });

    if (
      un_ordred_items.length == 0 ||
      !un_ordred_items.includes(req.body.productId)
      //if the product is already in the cart , we should just to increase the quantity of it
    ) {
      await prisma.item.create({
        data: {
          productId: req.body.productId,
          userId: user.id,
          quantity: 1,
          ordered: false,
        },
      });
    } else {
      for (let i = 0; i < un_ordred_items.length; i++) {
        // in real world there will be only one cart that has items  ordered=false
        if (un_ordred_items[i].productId == req.body.producId) {
          await prisma.item.update({
            where: {
              id: un_ordred_items[i].id,
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          });
        }

        break;
      }
    }

    if (!user.authorized) {
      let Token = getToken(user).accessToken;
      return res.status(201).json({
        Token,
      });
    } else {
      res.status(201).json({
        message: 'success',
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

const itemQuantity = async (id: string, operation: string) => {
  let itemId = id;
  if (operation == 'decrement') {
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  } else if (operation == 'increment') {
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  }
};
export const increaseItemQuantity = async (req: Request, res: Response) => {
  try {
    // maybe  the client side can  send with the request a flag parameter
    // to identify if it decrease or increasse but currently the i'm using two methods
    let itemId = req.params.id;
    itemQuantity(itemId, 'increment');

    res.status(200).json({
      data: 'the item incremented succesfully ',
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const decreaseItemQuantity = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    let itemId = req.params.id;
    itemQuantity(itemId, 'decrement');

    res.status(200).json({
      data: 'the item decremented succesfully ',
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
