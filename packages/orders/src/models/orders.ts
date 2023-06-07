import { Document, Model, Schema, model } from 'mongoose';


interface OrderAttrs {
  userId: string;
  products: Array<{productId: string, quantity: number, price: number}>;
  totalAmount: number;
}

interface orderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs):  OrderDoc;

}

interface OrderDoc extends Document {
  _id: string;
  userId: string;
  products: Array<{productId: string, quantity: number, price: number}>;
  totalAmount: number;
  version: number;
}

const productSchema = new Schema({
  productId: Schema.Types.ObjectId,
  quantity: Number,
  price: Number
}, {_id: false});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  products: {
    type: [productSchema],
    required: true,
  },
  totalAmount: Number,
});


orderSchema.set('versionKey', 'version');

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    userId: attrs.userId,
    products: attrs.products,
    totalAmount: attrs.totalAmount
  })
}

const Order = model<OrderDoc, orderModel>('orders', orderSchema);

export { Order };