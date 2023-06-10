import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
);

userSchema.set("versionKey", "version");


const User = mongoose.model("users", userSchema);

export { User };
