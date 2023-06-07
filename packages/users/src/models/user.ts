import mongoose from "mongoose";

interface UserAttrs {
  email: string;
  name: string;
  hashPassword: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  name: string;
  hashPassword: string;
  version: number;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    }
  },
);

userSchema.set("versionKey", "version");

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    email: attrs.email,
    name: attrs.name,
    hashPassword: attrs.hashPassword,
  });
};

const User = mongoose.model<UserDoc, UserModel>("users", userSchema);

export { User };
