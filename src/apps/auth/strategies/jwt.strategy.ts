import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import * as userService from '../../users/users.service';
const jwt = require('jsonwebtoken');
// import { User } from '.prisma/client';
// import { SECRET_KEY } from './../utils/config/config';
// import { SECRET_KEY } from '../../../utils/config/config';
import { SECRET_KEY } from '../../../utils/config/config';
import { createsession } from '@utils/utils';

passport.use(
  'jwt-user',
  new JwtStrategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async ({ id }, done) => {
      // console.log(` ${id}________________________`)
      try {
        const user = await userService.findUnique({
          where: { id },
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'jwt-optional',
  new JwtStrategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async ({ id }, done) => {
      console.log(`__________ the midelware ${id}`);

      try {
        if (!id) {
          let user = await createsession();
          console.log(`__________ the midelware  after createsession ${user}`);

          return done(null, user);
        }
        // console.log(`__________ the midelware ${id}`);
        else {
          const user = await userService.findUnique({
            where: { id },
          });
          console.log(`__________ the midelware  after user ${user}`);

          return done(null, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.serializeUser(function (user, done) {
//   console.log(`__________ the serilaize function ${user}`);
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user as User);
// });
