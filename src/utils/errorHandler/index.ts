import { ErrorRequestHandler, } from 'express';
import { Prisma } from '@prisma/client';
import { prismaErrorHandler } from './prismaErrorHandler';
import { BadRequestException } from './commonError';

export const errorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandler(req, res, error);
  }

  if (error instanceof BadRequestException) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
