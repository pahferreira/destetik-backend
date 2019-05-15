import express from 'express';
import ProvidedServiceController from './controller';
import auth from '../middlewares/auth';
import isValid from '../middlewares/validate';
const providedServiceRouter = express.Router();

providedServiceRouter.post('/create', isValid, auth, ProvidedServiceController.store);
providedServiceRouter.patch('/update/:id', isValid, auth, ProvidedServiceController.update);
providedServiceRouter.get('/show', auth, ProvidedServiceController.show);
providedServiceRouter.get('/available', auth, ProvidedServiceController.available);
providedServiceRouter.delete('/delete/:id', auth, ProvidedServiceController.delete);

export default providedServiceRouter;