import User from './../user/model';
import Service from './../services/model';
import ProvidedService from './model';
import dotenv from 'dotenv';

dotenv.config();

class ProvidedServiceController {
  async store(req, res){
    try{
      const { service, price } = req.body;
      if (!service)
        return res.send({error: "Alguns dados estão faltando"});
      const _service = await Service.findOne({name: service});
      if (!_service)
        return res.send({error: "Serviço não encontrado"})
      const user = await User.findById(req.user.id);
      const providedCheck = await ProvidedService.find({
        userId: user._id,
        serviceId: _service._id
      });
      if (providedCheck.length > 0)
      return res.send({error: "Este Serviço já foi adicionado"})
      const serviceId = _service.id;
      const userId = user.id;    
      const newPS = { serviceId, userId, price };
      const provided = await ProvidedService.create(newPS);
      user.services.push(provided._id);
      user.save();
      return res.json(provided);
    }catch(err){
      console.log(err);
    }
  }

  async show(req, res){
    try{
      const services = await ProvidedService.find({ userId : req.user.id }).populate('serviceId');
      return res.json(services);
    }catch(err){
      console.log(err);
    }
  }

  async available(req, res) {
    try {
      const providedServices = await ProvidedService.find({ userId : req.user.id }).select('serviceId');
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

  async update(req, res){
    try{
      const { price } = req.body;
      if (!price)
        return res.send({error: "Alguns dados estão faltando"});
      const provided = await ProvidedService.findById(req.params.id);
      if (provided.userId  != req.user.id)
        return res.status(401).send({error: "Não autorizado"});
      provided.price = price;
      provided.save();
      return res.json(provided);    

    }catch(err){
      console.log(err);
    }
  }

  async delete(req, res){
    try{
      const provided = await ProvidedService.findById(req.params.id);
      if (provided.userId  != req.user.id)
        return res.status(401).send({error: "Não autorizado"});
      provided.delete();
      return res.send({sucessfull: "Serviço deletado com sucesso"})
    }catch(err){
      console.log(err);
    }
  }
}

const providedServiceController = new ProvidedServiceController();
export default providedServiceController;