import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ProvidedServiceSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'service'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model('providedService', ProvidedServiceSchema);