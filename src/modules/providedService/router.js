import express from 'express';
import ProvidedServiceController from './controller';
import auth from '../middlewares/auth';
const providedServiceRouter = express.Router();

providedServiceRouter.post('/create', auth, ProvidedServiceController.store);
providedServiceRouter.patch('/update/:id', auth, ProvidedServiceController.update);
providedServiceRouter.get('/show', auth, ProvidedServiceController.show);
providedServiceRouter.get('/avaliable', auth, ProvidedServiceController.avaliable);
providedServiceRouter.delete('/delete/:id', auth, ProvidedServiceController.delete);

export default providedServiceRouter;