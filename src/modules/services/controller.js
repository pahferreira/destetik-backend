import Service from './model';
import dotenv from 'dotenv';

dotenv.config();

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

class ServiceController {

  async store(req, res) {
    try {
      const { name, description } = req.body;
      name = capitalize(name);
      const checkService = await Service.find({
        name
      });
      if (checkService.length > 0)
        return res
          .status(400)
          .json({error: 'O serviço já foi cadastrado.'})
      const newService = { name, description };
      const service = await Service.create(newService);
      return res.json(service);
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      if ('name' in req.body){
        req.body['name'] = capitalize(req.body['name']);
        const { name } = req.body
        const checkService = await Service.find({
          name
        });
        if (checkService.length > 0)
          return res
            .status(400)
            .json({error: 'Serviço ' + service.name + ' já foi cadastrado.'})
      }
      const service = await Service.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { useFindAndModify: false, new: true }
      );
      return res.json(service);
    } catch (err) {
      console.log(err);
    }
  }

  async show(req, res) {
    try {
      const service = await Service.findById(req.params.id);
      if (service) {
        return res.json(service);
      } else {
        return res
          .status(400)
          .json({ error: 'Serviço ' + service.name + ' não encontrado' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async showAll(req, res) {
    try {
      const services = await Service.find();
      return res.json(services);
    } catch (err) {
      console.log(err);
    }
  }
  
  async delete(req, res){
    try{
      const service = await Service.findOneAndDelete({_id: req.params.id});
      if(service){
        return res.json(service);
      }else{
        return res
          .status(400)
          .json({error: 'Serviço ' + service.name + ' not found'});
      }
    } catch(err){
      console.log(err);
    }
  }
}

const serviceController = new ServiceController();
export default serviceController;
