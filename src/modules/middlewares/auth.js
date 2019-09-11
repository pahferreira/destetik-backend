import passport from 'passport';

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      
      res.send(info.message);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export default auth;
