import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
var sessionstorage = require('sessionstorage');

// const session = require('express-session');
// var genuuid = require('uuid');
import { v4 as uuid } from 'uuid';
// const id: string = uuid();

export const checkUser = async () => {
  let id = sessionstorage.getItem('id');
  console.log(id);
  if (id) {
    let user = prisma.user.findUnique({
      where: {
        id,
      },
    });
    sessionstorage.setItem('id', id);
    // i noticed after use get item , the value in the session is gone ,
    // so every time i use get item from the session stotage i use set item to resave the value
    return user;
  }
  return null;
};

export const createsession = async () => {
  // let id = genuuid()
  const id: string = uuid();

  sessionstorage.setItem('id', id);
  let user = await prisma.user.create({
    data: {
      id: id,
      password: '0',
      authorized: false,
    },
  });

  return user;
};

// session(
//     {
//         name: 'SessionCookie',
//         genid: function (req: Request) {
//             console.log('session id created');
//             return genuuid();
//         },
//         secret: 'secret',
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false, expires: 60000 }

//     }

// )
// req.session = session
// next()
