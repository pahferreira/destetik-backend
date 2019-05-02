import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';
import User from '../modules/user/model'

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;


const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret.secret,
};
    
passport.use(
'jwt',
new JWTstrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    try {
    User.findOne({
        _id: jwt_payload.id,
    }).select('-password').then(user => {
        if (user) {
        console.log('user found in db in passport');
        // note the return removed with passport JWT - add this return for passport local
        done(null, user);
        } else {
        console.log('user not found in db');
        done(null, false);
        }
    });
    } catch (err) {
    done(err);
    }
}),
);