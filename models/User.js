import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  "first-name": {
    type: String,
    minLength: 1,
    maxLength: 32,
  },
  "last-name": {
    type: String,
    minLength: 1,
    maxLength: 32,
  },
  username: {
    type: String,
    minLength: 1,
    maxLength: 64,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    minLength: 1,
  },
  password: {
    type: String,
    maxLength: 256,
  },
  identicon: String,
});

userSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

export default mongoose.model("User", userSchema);
