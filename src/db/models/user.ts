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

const CardsSchema = new Schema({
  card_id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const VerifiedSchema = new Schema({
  mode: Boolean
});

UsersSchema.index({ name: 'text' });
CardsSchema.index({ id: 'text' });
VerifiedSchema.index({ mode: 'text' });

export const User = mongoose.models.User || mongoose.model('User', UsersSchema);
export const Card = mongoose.models.Card || mongoose.model('Card', CardsSchema);
export const Verified =
  mongoose.models.Verified || mongoose.model('Verified', VerifiedSchema);
