import express from 'express';
import userRouter from './modules/user/router';
import serviceRouter from './modules/services/router';
const routes = express.Router();

routes.use('/api/user', userRouter);
routes.use('/api/service', serviceRouter);

export default routes;
