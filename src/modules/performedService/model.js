import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PerformedServiceSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  providedServiceId: {
    type: Schema.Types.ObjectId,
    ref: 'providedService',
    required: true
  },
  ratingId: {
    type: Schema.Types.ObjectId,
    ref: 'rating'
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('performedService', PerformedServiceSchema);
