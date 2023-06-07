import { Document, Model, Schema, model  } from 'mongoose';


interface prouductAttrs {
  name: string;
  price: number;
}

 interface productDoc extends Document {
  _id: string;
  name: string;
  price: number;
  isActive: boolean;
  version: string;
}

interface productModel extends Model<productDoc> {
  build(attrs: prouductAttrs) : productDoc
}


const  productSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
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


const Product = model<productDoc, productModel>('products', productSchema);

export { Product, productDoc };