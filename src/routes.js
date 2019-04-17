import express from 'express';
import userRouter from './modules/user/router';
const routes = express.Router();

routes.use('/api/user', userRouter);

export default routes;
