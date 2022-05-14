import { NextFunction, Request, Response } from "express";

const session = require('express-session');
var genuuid = require('uuid/v4');


// export const createsession = (req: Request, res: Response, next: NextFunction) => {
//     // let id = genuuid()
//     // console.log(`_____ the id ${id}`)
//     session(
//         {
//             name: 'SessionCookie',
//             genid: function (req: Request) {
//                 console.log('session id created');
//                 return genuuid();
//             },
//             secret: 'secret',
//             resave: false,
//             saveUninitialized: false,
//             cookie: { secure: false, expires: 60000 }

//         }

//     )
//     // req.session = session
//     next()

// }