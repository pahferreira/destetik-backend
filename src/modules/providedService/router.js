import express from 'express';
import providedServiceController from './controller';
const providedServiceRouter = express.Router();

providedServiceRouter.post('/create', providedServiceController.store);
providedServiceRouter.patch('/update/:id', providedServiceController.update);
providedServiceRouter.get('/:id', providedServiceController.show);
providedServiceRouter.get('/', providedServiceController.showAll);
providedServiceRouter.delete('/:id', providedServiceController.delete);

export default providedServiceRouter;