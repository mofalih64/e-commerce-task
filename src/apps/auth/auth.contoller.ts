import { User } from '.prisma/client';
import { SECRET_KEY } from '@utils/config/config';
import { createsession } from '@utils/utils';
import { Request, Response, Handler, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import { promisify } from 'util';
import { findUnique } from '../users/users.service';
import * as authService from './auth.service';
import { checkUser } from '../../utils/utils';
import { prisma } from '../../prisma/prisma.service';

export const login: Handler = async (req, res) => {
  return res.json(authService.reshape(req.user as User, 'signIn'));
};

export const signup = async (req: Request, res: Response) => {
  return res.json(authService.reshape(req.user as User, 'signUp'));

  // const { phoneNumber } = req.body

  // const user = await prisma.user.findUnique({
  //   where: {
  //     phoneNumber,
  //   },
  // })

  // if (!user) {
  //   const newUser = await prisma.user.create({
  //     data: {
  //       phoneNumber: phoneNumber,
  //       password: req.body.password
  //     }
  //   })

  //   console.log(newUser)
  // }
};

export const authorize: Handler = async (req, res, next: NextFunction) => {
  try {
    // console.log(req.path == '/create-cart');
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // console.log(`__________ the token ${token}`);
    if (token == null) {
      let vistorUser = await checkUser();
      if (vistorUser != null) {
        req.user = vistorUser;
        next();
      } else {
        if (req.path == '/create-cart') {
          let user = await createsession();
          // console.log(`__________ the user  after createsession ${user}`);
          req.user = user;
          next();
        }
      }
    } else {
      // console.log(`______******____ the token ${token}`);

      const payload = await promisify(jwt.verify)(token, SECRET_KEY);
      // console.log(
      //   `__________ the midelware  after createsession ${JSON.stringify(
      //     payload
      //   )}`
      // );

      let id = payload.id;
      // console.log(`__________ the id  after stringfy ${id}`);
      let user = await prisma.user.findUnique({ where: { id } });
      if (user == null) {
        res.status(401).json('not authourised unvalid token');
      } else {
        // console.log(
        //   `__________ the user after stringfy ${await JSON.stringify(user)}`
        // );

        req.user = user;
        next();
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(403).json('not authourised');
  }
};

// export const getTheUser: Handler = async (req, res, next) => {
//   let id = sessionStorage.getItem('id')
//   if(id){}
// }

export const getIdFromToken = async (req: Request, res: Response) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(`__________ the token ${token}`);

  const payload = await promisify(jwt.verify)(token, SECRET_KEY);
  // console.log(
  // `__________ the midelware  after createsession ${JSON.stringify(payload)}`
  // );

  let id = payload.id;
  // console.log(`__________ the id  after stringfy ${id}`);
  return id;
};
