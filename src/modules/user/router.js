import express from 'express';
import UserController from './controller';
import auth from '../middlewares/auth';
import isValid from '../middlewares/validate';
import upload from '../middlewares/upload';
import passport from 'passport';
const userRouter = express.Router();

//upload.single('productImage')
userRouter.post('/register', isValid, UserController.store);
userRouter.post('/login', isValid, UserController.login);
userRouter.patch('/update', auth, isValid, UserController.update);
userRouter.get('/show/:id', UserController.show);
userRouter.get('/all', UserController.showAll);
userRouter.get('/current', auth, UserController.current);
userRouter.delete('/delete', auth, UserController.delete);
userRouter.patch(
  '/image_update',
  auth,
  upload.single('image_profile'),
  UserController.update_photo_profile
);

userRouter
  .route('/login/facebook')
  .post(
    passport.authenticate('facebookToken', { session: false }),
    UserController.facebookOAuth
  );

userRouter
  .route('/login/google')
  .post(
    passport.authenticate('googleToken', { session: false }),
    UserController.googleOAuth
  );

export default userRouter;
