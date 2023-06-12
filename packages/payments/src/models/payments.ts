import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  orderId: Schema.Types.ObjectId,
  amount: {
    type: Number,
    required: true,
  },
  userId: Schema.Types.ObjectId,
  paid: {
    type: Boolean,
    default: false,
  }
})

const Payment = model('nats-payments', paymentSchema)

export { Payment };