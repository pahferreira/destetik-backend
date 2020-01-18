import express from 'express';
import PerformedServiceController from './controller';
import auth from '../middlewares/auth';

const psRouter = express.Router();

psRouter.post('/create', auth, PerformedServiceController.store);
psRouter.get('/showClient', auth, PerformedServiceController.showClient);
psRouter.get('/showProvider', auth, PerformedServiceController.showProvider);
psRouter.post('/payService', auth, PerformedServiceController.payService);
psRouter.post('/changePaymentStatus', PerformedServiceController.changePaymentStatus);

export default psRouter;
