import { PrismaClient, User, Item } from '@prisma/client';
const prisma = new PrismaClient();
import type { Response, Request } from 'express';
// import { authorize } from 'passport';

export const creatOrder = async (req: Request, res: Response) => {
  const user = req.user as User;
  console.log(`the user ordered that  +++ ${JSON.stringify(user)}`);

  try {
    // let userData=JSON.stringify(req.user)

    // if (!req.user){
    //     res.json({
    //         message:'please complete your registrition  '
    //     })
    // }

    if (user.authorized == false) {
      return res.status(403).json({
        message: 'please complete your registeration',
      });
    }
    let items = await prisma.item.findMany({
      where: {
        userId: user.id,
        ordered: false,
      },
    });

    console.log(items.length);
    if (items.length == 0) {
      res.status(404).json({
        message: 'there is no item in your cart ',
      });
    } else {
      // items=i
      let arrayOfIds = [{}];
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].id);
        arrayOfIds.push({ id: items[i].id });
        arrayOfIds.shift();
      }
      // console.log(
      //   `the array of ids  STRIGGFIED +++ ${JSON.stringify(arrayOfIds)}`
      // );
      let itemId = arrayOfIds[0];

      // console.log(`the id of item    +++ ${itemId}`);
      // console.log(`the array of ids +++ ${JSON.stringify(arrayOfIds)}`);
      let newOrder = await prisma.order.create({
        data: {
          userId: user.id,
          ordered: false,
          items: {
            connect: arrayOfIds,
          },
        },
      });

      await transItems(user.id);
      // let array = arrayOfIds.shift();
      res.status(201).json({
        message: 'hthe ordere created succesfuly',
      });
      // console.log(`the order +++ ${JSON.stringify(newOrder)}`);
    }
  } catch (error) {
    // if(items.['])
    // arrayOfIds.push(items[i].)
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const checkout = async (req: Request, res: Response) => {
  const user = req.user as User;

  try {
    // we can add refrence code to the order table or the address
    let order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        ordered: false,
      },
    });
    await prisma.order.update({
      where: {
        id: order?.id,
      },
      data: {
        ordered: true,
      },
    });
    res.status(201).json({
      message: 'the order checked out  succesfuly',
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

const transItems = async (id: string) => {
  await prisma.item.updateMany({
    where: {
      userId: id,
      ordered: false,
    },
    data: {
      ordered: true,
    },
  });
};
