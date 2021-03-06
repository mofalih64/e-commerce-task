import { Prisma, User } from '.prisma/client';
import { prisma } from '../../prisma/prisma.service';
// import { checkUser } from './users.controller';
import { Handler, NextFunction } from 'express';

export const reshape = (users: User[]) => {
  // exclude password field
  return users.map(({ password, ...safe }) => safe);
};

export const findMany = async (args?: Prisma.UserFindManyArgs) => {
  const users = await prisma.user.findMany(args);
  const count = await prisma.user.count({ where: args?.where });
  return [reshape(users), count];
};

// findUniq
export const findUnique = async (args: Prisma.UserFindUniqueArgs) => {
  const user = await prisma.user.findUnique(args);

  const [reshapedUser] = reshape([user as User]);

  return reshapedUser;
  // return user;
};

export const findUniqueUnsafe = async (args: Prisma.UserFindUniqueArgs) => {
  const users = await prisma.user.findUnique(args);
  return users;
};

export const create = async (args: Prisma.UserCreateArgs) => {
  // console.log(JSON.stringify(args))

  // console.log(`${JSON.stringify(args)}}__________`)
  // console.log(args.password)

  let user = await prisma.user.create(args);

  const [reshapedUser] = reshape([user]);
  return reshapedUser;
};
