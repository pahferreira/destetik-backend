import express from 'express';
import RatingController from './controller';
import auth from '../middlewares/auth';
import isValid from '../middlewares/validate';

const ratingRouter = express.Router();

ratingRouter.post('/create', isValid, RatingController.store);
ratingRouter.get('/show', isValid, auth, RatingController.show);

export default ratingRouter;
