import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as userService from '../../users/users.service';
import bcrypt from 'bcryptjs';
import { BadRequestException } from '../../../utils/errorHandler/commonError';
import { authorize } from 'passport';

const isValidPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'phoneNumber',
      passwordField: 'password',
      passReqToCallback: true,
    },

    async (req, phoneNumber, password, done) => {
      try {
        password = await bcrypt.hash(password, 12);
        const user = await userService.create({
          data: {
             phoneNumber,
              password ,
              authorized:true},
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'phoneNumber',
      passwordField: 'password',
    },
    async (phoneNumber, password, done) => {
      try {
        // Fetch the user from the db
        const user = await userService.findUniqueUnsafe({
          where: {
            phoneNumber,
          },
        });

        // If no user found
        if (!user) {
          throw new BadRequestException('No user found with this email');
        }

        // validate the password
        const validate = await isValidPassword(password, user.password);

        if (!validate) {
          throw new BadRequestException('The provided password is invalid');
        }

        const [reshapedUser] = userService.reshape([user]);
        return done(null, reshapedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
