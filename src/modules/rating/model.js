import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  appraiserId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  rate: {
    type: Number,
    required: true
  }
});

export default mongoose.model('rating', RatingSchema);
