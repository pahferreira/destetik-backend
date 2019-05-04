import jwtSecret from './jwtConfig';
import User from '../modules/user/model';
import passport from 'passport';
import passport_jwt from 'passport-jwt';

const BCRYPT_SALT_ROUNDS = 12;

const JWTstrategy = passport_jwt.Strategy,
  ExtractJWT = passport_jwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret
};

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
