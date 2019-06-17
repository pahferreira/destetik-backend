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
      const {providedServiceId} = req.body
      const payload = {
        clientId : req.user.id,
        providedServiceId : providedServiceId
      }
      const performedService = await PerformedService.create(payload);
      return res.json(performedService);
    } catch (err) {
      console.log(err);
    }
  }

  async showClient(req, res) {
    try {
      const services = await PerformedService.find({ clientId: req.user.id })
      .populate('clientId', '_id name')
      .populate('providedServiceId')
      .populate({path:'providedServiceId', populate: {
        path:'userId',
        select: {'_id':1, 'name':1}
      }})
      .populate({path:'providedServiceId', populate: {
        path:'serviceId',
        select: {'_id':1, 'name':1}
      }});
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }

  async showProvider(req, res) {
    try {
      const providedServices = await ProvidedService.find({ userId : req.user.id }).select('id');
      const services = await PerformedService.find({ providedServiceId: { $in : providedServices} })
      .populate('clientId', '_id name')
      .populate('providedServiceId')
      .populate({path:'providedServiceId', populate: {
        path:'userId',
        select: {'_id':1, 'name':1}
      }})
      .populate({path:'providedServiceId', populate: {
        path:'serviceId',
        select: {'_id':1, 'name':1}
      }});
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }
}

const performedServiceController = new PerformedServiceController();
export default performedServiceController;
