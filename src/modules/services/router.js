import express from 'express';
import ServiceController from './controller';
import isValid from '../middlewares/validate'

const serviceRouter = express.Router();

serviceRouter.patch('/update/:id', isValid, ServiceController.update);
serviceRouter.get('/:id', ServiceController.show);
serviceRouter.get('/', ServiceController.showAll);
serviceRouter.post('/register', isValid, ServiceController.store);
serviceRouter.delete('/:id', ServiceController.delete);

export default serviceRouter;
