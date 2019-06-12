import User from './../user/model';
import Service from './../services/model';
import Rating from './model';
import dotenv from 'dotenv';

dotenv.config();

class RatingController {
  async store(req, res) {
    try {
      const { service, rate } = req.body;
      if (!service) {
        return res.send({ error: 'Serviço não selecionado' });
      }
      const choosedService = await Service.findOne({ name: service });
      if (!choosedService) {
        return res.send({ error: 'Serviço não encontrado' });
      }
      const user = await User.findById(req.user.id);
      const checkRating = await Rating.find({
        userId: user._id,
        serviceId: choosedService._id
      });

      if (checkRating.length > 0) {
        return res.send({
          error: 'O serviço já foi avaliado por este usuário'
        });
      }
      const serviceId = choosedService.id;
      const userId = user.id;
      const newRate = { serviceId, userId, rate };
      const evaluation = await Rating.create(newRate);
      user.rating.push(evaluation._id);
      user.save();
      return res.json(evaluation);
    } catch (err) {
      console.log(err);
    }
  }

  async show(req, res) {
    try {
      const ratings = await Rating.find({ userId: req.user.id }).populate(
        'serviceId'
      );
      return res.json(ratings);
    } catch (err) {
      console.log(err);
    }
  }
}

const ratingController = new RatingController();
export default ratingController;
