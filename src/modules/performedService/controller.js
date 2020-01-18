import User from './../user/model';
import Service from './../services/model';
import ProvidedService from './../providedService/model'
import PerformedService from './model';
import dotenv from 'dotenv';
const axios = require('axios').default;

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
        select: {'_id':1, 'name':1, 'image':1}
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
        select: {'_id':1, 'name':1, 'image':1}
      }});
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }

  async payService(req, res) {
    const {performedServiceId} = req.body
    axios.post('http://3.93.37.174:3000/', req.body).then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    return res.json('Your payment will be processed')

  }

  async changePaymentStatus(req, res) {
    const {performedServiceId} = req.body;
    try{
      const service = await PerformedService.findOneAndUpdate(
        { _id: performedServiceId },
        { $set: {'isPaid': true} },
        { useFindAndModify: false, new: true }
      );
      return res.status(204).json('Success')
    } catch (err) {
      console.log(err);
      return res.status(404).json()
    }
  }
}

const performedServiceController = new PerformedServiceController();
export default performedServiceController;
