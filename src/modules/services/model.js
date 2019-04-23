import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image:{
    type: String
  }

});

export default mongoose.model('service', ServiceSchema);