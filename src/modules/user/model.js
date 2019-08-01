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
    select: false
  },
  address: {
    cep: String,
    street: String,
    district: String,
    city: String,
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
      ref: 'providedService'
    }
  ],
  rates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'rating'
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  qtEvaluation: {
    type: Number,
    default: 0
  },
  profileImg: {
    type: String,
    default:
      'https://res.cloudinary.com/destetik/image/upload/v1557010793/notFound_nlnz38.jpg'
  },
  google: {
    id: {
      type: String
    },
  },
  facebook: {
    id: {
      type: String
    },
  }

});

export default mongoose.model('user', UserSchema);
