import express from 'express';
import ProvidedServiceController from './controller';
import auth from '../middlewares/auth';
const providedServiceRouter = express.Router();

providedServiceRouter.post('/create', auth, ProvidedServiceController.store);
// providedServiceRouter.patch('/update/:id', providedServiceController.update);
providedServiceRouter.get('/show', auth, ProvidedServiceController.show);
providedServiceRouter.get('/avaliable', auth, ProvidedServiceController.avaliable);
// providedServiceRouter.get('/', providedServiceController.showAll);
// providedServiceRouter.delete('/:id', providedServiceController.delete);

export default providedServiceRouter;