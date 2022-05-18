import { User } from '@prisma/client';
import { Handler, NextFunction, Response, Request } from 'express';
import { prisma } from 'src/prisma/prisma.service';
import { getIdFromToken } from '../auth/auth.contoller';
import * as userService from './users.service';
var sessionstorage = require('sessionstorage');

// import { authorize } from 'passport';
// import { create } from './users.service';

export const getUser = async (req: Request, res: Response) => {
  const user = req.user as User;

  // console.log(`______________________ ${req.user?.id}`)
  const theUser = await userService.findUnique({
    where: {
      id: user.id,
    },
  });
  const [reshapedUser] = userService.reshape([user as User]);

  res.status(200).json({
    data: reshapedUser,
  });
};

//  sendRes({
//    data:users
//  })
// };

// function sendRes<T> ({res , data  , count}) {

// }

export const userExist: Handler = async (req, res, next: NextFunction) => {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: req.body.phoneNumber,
    },
  });

  if (user && user.password == req.body.password) {
    const [reshapedUser] = userService.reshape([user as User]);
    req.user = reshapedUser;
    next();
  } else {
    return res.json({
      message: 'the phone number or the password is wrong',
    });
  }
};

export const createuser: Handler = async (req, res, next: NextFunction) => {
  // console.log(`${req.body.phoneNumber}__________`)
  const user = await userService.create({
    data: {
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      authorized: true,
    },
  });
  // console.log(user);
  req.user = user;
  next();
};

export const createAccount: Handler = async (req, res, next: NextFunction) => {
  try {
    let id = await getIdFromToken(req, res);
    console.log(`THE ID IN CREATE ACCOUNT ${id}`);
    let account = prisma.user.update({
      where: {
        id,
      },
      data: {
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        firstName: req.body.firstName,
        authorized: true,
      },
    });
    console.log(JSON.stringify(account));
    sessionstorage.setItem('id', id);

    req.user = account;
    res.status(200).json({
      message: 'the account updated succesfuly',
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

// const getalldata=(Model,req,res)=>{
// await
// }
