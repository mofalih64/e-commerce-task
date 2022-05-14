import express from 'express';
// const genuuid = require('uuid/v4');
// const session = require('express-session');
// var bodyParser = require('body-parser')
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import router from './routers';
import { errorHandler } from './utils/errorHandler';

// Init the app
const app = express();



// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())


// Security headers
app.use(helmet());

// Compress requests
app.use(compression());

// Parse incoming requests with JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Authentication with passport
app.use(passport.initialize());
import './apps/auth/strategies/jwt.strategy';
import './apps/auth/strategies/local.strategy';
import { API_PREFIX } from './utils/config/config';


app.use(API_PREFIX, router);

// app.use(session(
//     {
//         name: 'SessionCookie',
//         genid: function (req: Request) {
//             console.log('session id created');
//             return genuuid();
//         },
//         secret: 'Shsh!Secret!',
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false, expires: 60000 }
//     }));

// export interface Request extends Express.Request {
//     session: [any];
// }
// Error handler
app.use(errorHandler);

export { app };
