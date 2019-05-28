import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false
    }  
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String
    }
  },
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
    required: true,
    select: false
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
      ref: 'providedService'
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
    default: 'https://res.cloudinary.com/destetik/image/upload/v1557010793/notFound_nlnz38.jpg'
  }
});

export default mongoose.model('user', UserSchema);
