import mongoose from 'mongoose';

const counselorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  specialization: {
    type: String
  }

}, { timestamps: true });

const Counselor = mongoose.model('Counselor', counselorSchema);

export default Counselor;