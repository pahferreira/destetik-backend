import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ProvidedServiceSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'service'
  },
  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model('providedService', ProvidedServiceSchema);