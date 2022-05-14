import { Handler, NextFunction, Request, Response } from 'express';
import * as userService from './users.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const [users, count] = await userService.findMany();
}



//  sendRes({
//    data:users
//  })
// };


// function sendRes<T> ({res , data  , count}) {

// }

export const createuser: Handler = async (req, res, next: NextFunction) => {
  // console.log(`${req.body.phoneNumber}__________`)
  const user = await userService.create(req.body);
  console.log(user);

  next();
}


// const getalldata=(Model,req,res)=>{
// await
// }