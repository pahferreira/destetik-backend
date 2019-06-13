import User from './../user/model';
import Service from './../services/model';
import PerformedService from './../performedService/model';
import Rating from './model';
import dotenv from 'dotenv';

dotenv.config();

class RatingController {
  async store(req, res) {
    try {
      const { rate, performedServiceId } = req.body;
      const performedService = await PerformedService.find({_id : performedServiceId}).populate('providedServiceId');
      const loggedUser = await User.findById(req.user.id);
      let user;
      if (loggedUser._id.equals(performedService[0].clientId)) { // Avaliador é o cliente
        user = await User.findById(performedService[0].providedServiceId.userId).populate({
          path: 'rates',
          populate: [
            {
              path: 'ratingId',
              model: 'rating'
            }
          ]
        });
      } else{
        user = await User.findById(performedService[0].clientId).populate({
          path: 'rates',
          populate: [
            {
              path: 'ratingId',
              model: 'rating'
            }
          ]
        });
      }
      if (user.rates.some( e => loggedUser._id.equals(e.appraiserId))) { 
        return res.send({
          error: 'Você já avaliou este usuário'
        });
      }
      const payload = {
        appraiserId : loggedUser._id,
        rate : rate
      };
      const rating = await Rating.create(payload); 
      user.rates.push(rating);
      const sum = user.rates.reduce((result, filter) => {
        return result + Number(filter.rate);
      }, 0);
      user.rating = sum / user.rates.length;
      user.save();      
      return res.json(rating);
    } catch (err) {
      console.log(err);
    }
  }

  async show(req, res) {
    try {
      const ratings = await Rating.find({ userId: req.user.id });
      return res.json(ratings);
    } catch (err) {
      console.log(err);
    }
  }
}

const ratingController = new RatingController();
export default ratingController;
