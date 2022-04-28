import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const UsersSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: Number,
    trim: true,
    unique: true
  },
  documentNumber: {
    type: Number,
    required: true,
    trim: true,
    unique: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  authType: {
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
