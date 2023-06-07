import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  orderId: Schema.Types.ObjectId,
  amount: {
    type: Number,
    required: true,
  },
  userId: Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
  }
})