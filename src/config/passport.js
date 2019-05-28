import jwtSecret from './jwtConfig';
import User from '../modules/user/model';
import passport from 'passport';
import passport_jwt from 'passport-jwt';
import { access } from 'fs';

const BCRYPT_SALT_ROUNDS = 12;

const GooglePlusTokenStrategy = require('passport-google-plus-token');

const JWTstrategy = passport_jwt.Strategy,
  ExtractJWT = passport_jwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret
};

//GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: '1040091880551-g4r80fcqi4gjecrlit45f2efn4oob99g.apps.googleusercontent.com',
  clientSecret: '7x-OINuPYmhGl5SCwv6ST1vW'
}, async(accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    const existingUser = await User.findOne({ "google.id": profile.id });
    if(existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.email[0].value
      }
    })

    await newUser.save();
    done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
}));

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        _id: jwt_payload.id
      })
        .select('-password')
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  })
);
