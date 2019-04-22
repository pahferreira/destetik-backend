import User from './../user/model';
import Service from './../services/model';
import ProvidedService from './model';
import dotenv from 'dotenv';

dotenv.config();

class ProvidedServiceController {
  async store(req, res){
    try{
      const { service, price } = req.body;
      if (!service || !price)
        return res.send({error: "Alguns dados estão faltando"});
      const _service = await Service.findOne({name: service});
      if (!_service)
        return res.send({error: "Serviço não encontrado"})
      const user = await User.findById(res.locals.auth_data.id);
      const serviceId = _service.id;
      const userId = user.id;    
      const newPS = { serviceId, userId, price };
      const provided = await ProvidedService.create(newPS);
      return res.json(provided);
    }catch(err){
      console.log(err);
    }
  }

  async show(req, res){
    try{
      const services = await ProvidedService.find({ userId : res.locals.auth_data.id });
      return res.json(services);
    }catch(err){
      console.log(err);
    }
  }

  async avaliable(req, res) {
    try {
      const providedServices = await ProvidedService.find({ userId : res.locals.auth_data.id }).select('serviceId');
      let services_id = [];
      await providedServices.forEach(element => {
        services_id.push(element.serviceId);
      }); 
      const services = await Service.find( { _id: { $nin: services_id } } );
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }

  // async update(req, res){
  //   try{

  //   }catch(err){
  //     console.log(err);
  //   }
  // }


  // async delete(req, res){
  //   try{

  //   }catch(err){
  //     console.log(err);
  //   }
  // }
}

const providedServiceController = new ProvidedServiceController();
export default providedServiceController;