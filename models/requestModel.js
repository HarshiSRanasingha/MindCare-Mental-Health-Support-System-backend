import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  counselorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Counselor',
    default: null
  },

  issue: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'pending'
  }

}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;