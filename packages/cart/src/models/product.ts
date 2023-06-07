import { Schema, model  } from 'mongoose';


const  productSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  }
})


productSchema.set('versionKey', 'version');


const Product = model('products', productSchema);

export { Product };