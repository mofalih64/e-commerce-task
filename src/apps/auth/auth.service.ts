import { User } from '.prisma/client';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../utils/config/config';

export const reshape = (user: User, goal?: string) => {
  if (goal == 'refresh') {
    return {
      refreshToken: jwt.sign({ id: user.id }, SECRET_KEY as string),
      user,
    };
  } else {
    console.log(JSON.stringify(user));
    return {
      accessToken: jwt.sign({ id: user.id }, SECRET_KEY as string),
      user,
    };
  }
};

export const getToken = (user: User) => {
  return { accessToken: jwt.sign({ id: user.id }, SECRET_KEY as string) };
};
