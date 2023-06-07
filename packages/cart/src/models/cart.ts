import { Document, Model, Schema, model } from 'mongoose';


interface CartAttrs {
  userId: string;
  products: Array<{productId: string, quantity: number}>;
  totalAmount: number;
}

interface cartModel extends Model<CartDoc> {
  build(attrs: CartAttrs):  CartDoc;

}

interface CartDoc extends Document {
  _id: string;
  userId: string;
  products: Array<{productId: string, quantity: number}>;
  totalAmount: number;
  version: number;
}

const productSchema = new Schema({
  productId: Schema.Types.ObjectId,
  quantity: Number,
}, {_id: false});

const cartSchema = new Schema({
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
 

cartSchema.set('versionKey', 'version');

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart({
    userId: attrs.userId,
    products: attrs.products,
    totalAmount: attrs.totalAmount
  })
}

const Cart = model<CartDoc, cartModel>('orders', cartSchema);

export { Cart };