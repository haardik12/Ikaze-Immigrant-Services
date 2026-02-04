import mongoose from 'mongoose'
import crypto from 'crypto'

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribeToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(32).toString('hex'), // Generates a secure random token
  },
})

export default mongoose.model(
  'Subscriber',
  subscriberSchema
)
