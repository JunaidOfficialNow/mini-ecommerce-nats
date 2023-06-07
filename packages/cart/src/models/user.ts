import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
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
