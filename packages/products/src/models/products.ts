import { Document, Schema, model  } from 'mongoose';


interface prouductAttrs {
  name: string;
  price: string;
}

interface productDoc extends Document {
  name: string;
  price: number;
  isActive: boolean;
  version: string;
}


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

productSchema.statics.build = (attrs: prouductAttrs ) => {
  return new Product({
    name: attrs.name,
    price: attrs.price,
  })

}


const Product = model('products', productSchema);

export { Product };