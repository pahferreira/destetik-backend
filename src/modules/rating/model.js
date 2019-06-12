import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'service'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  rate: {
    type: Number,
    required: true
  }
});

export default mongoose.model('rating', RatingSchema);
