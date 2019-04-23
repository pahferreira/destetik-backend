import express from 'express';
import UserController from './controller';
import auth from '../middlewares/auth';
import upload from '../middlewares/upload';
const userRouter = express.Router();

//upload.single('productImage')
userRouter.post('/register', UserController.store);
userRouter.post('/login', UserController.login);
userRouter.patch('/update', auth, UserController.update);
userRouter.get('/:id', UserController.show);
userRouter.get('/', UserController.showAll);
userRouter.delete('/delete', auth, UserController.delete);

export default userRouter;
