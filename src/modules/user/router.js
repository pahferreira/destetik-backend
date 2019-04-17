import express from 'express';
import UserController from './controller';
const userRouter = express.Router();

userRouter.post('/register', UserController.store);
userRouter.post('/login', UserController.login);
userRouter.patch('/update/:id', UserController.update);
userRouter.get('/:id', UserController.show);
userRouter.get('/', UserController.showAll);
userRouter.delete('/:id', UserController.delete);

export default userRouter;
