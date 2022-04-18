import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

UsersSchema.index({ name: 'text' });

module.exports = mongoose.models.User || mongoose.model('User', UsersSchema);
