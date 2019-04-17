import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    street: String,
    district: String,
    houseNumber: String,
    geoLocation: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    }
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'service'
    }
  ]
});

export default mongoose.model('user', UserSchema);
