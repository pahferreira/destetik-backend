import config from './config';
import User from '../modules/user/model';
import passport from 'passport';
import passport_jwt from 'passport-jwt';
import FacebookTokenStrategy from 'passport-facebook-token';
import auth_facebook from './authFacebook'


const BCRYPT_SALT_ROUNDS = 12;

const JWTstrategy = passport_jwt.Strategy,
  ExtractJWT = passport_jwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
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

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.facebook_api_key,
  clientSecret: config.facebook_api_secret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('dswda');
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      name: profile.displayName,
      profileImg: profile.photos[0].value,
      email: profile.emails[0].value,
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}));

export default passport;
