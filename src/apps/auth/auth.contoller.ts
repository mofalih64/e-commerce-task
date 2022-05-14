import { User } from '.prisma/client';
import { Request, Response } from 'express';
import { prisma } from 'src/prisma/prisma.service';
import * as authService from './auth.service';

export const login = async (
  req: Request,
  res: Response
) => {
  // return res.json(authService.reshape(req.user as User));
};

export const signup = async (
  req: Request,
  res: Response
) => {

  const { phoneNumber } = req.body

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  })

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
        password: req.body.password
      }
    })

    console.log(newUser)
  }
  return res.json(authService.reshape(req.user as User));
};
