import User from './../user/model';
import Service from './../services/model';
import ProvidedService from './../providedService/model'
import PerformedService from './model';
import dotenv from 'dotenv';

dotenv.config();

class PerformedServiceController {
  async store(req, res) {
    try {
      // TODO Validação de cliente e providedService inexistentes
      const performedService = await PerformedService.create(req.body);
      return res.json(performedService);
    } catch (err) {
      console.log(err);
    }
  }

  async showClient(req, res) {
    try {
      const services = await PerformedService.find({ clientId: req.user.id }).populate(
        'ratingId'
      );
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }

  async showProvider(req, res) {
    try {
      const providedServices = await ProvidedService.find({ userId : req.user.id }).select('id');
      const services = await PerformedService.find({ providedServiceId: { $in : providedServices} }).populate(
        'ratingId'
      );
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }
}

const performedServiceController = new PerformedServiceController();
export default performedServiceController;
