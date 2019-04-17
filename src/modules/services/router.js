import express from 'express';
import ServiceController from './controller';
const serviceRouter = express.Router();

serviceRouter.patch('/update/:id', ServiceController.update);
serviceRouter.get('/:id', ServiceController.show);
serviceRouter.get('/', ServiceController.showAll);
serviceRouter.post('/register', ServiceController.store);
serviceRouter.delete('/:id', ServiceController.delete);


export default serviceRouter;
