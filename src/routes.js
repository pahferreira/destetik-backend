import express from 'express';
import userRouter from './modules/user/router';
import serviceRouter from './modules/services/router';
import providedRouter from './modules/providedService/router';
import ratingRouter from './modules/rating/router';
import performedRouter from './modules/performedService/router';
const routes = express.Router();

routes.use('/api/user', userRouter);
routes.use('/api/service', serviceRouter);
routes.use('/api/provided', providedRouter);
routes.use('/api/rating', ratingRouter);
routes.use('/api/performed', performedRouter);

export default routes;
