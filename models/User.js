import mongoose from "mongoose";
const Schema = mongoose.Scema;

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
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    minLength: 1,
  },
});

export default mongoose.model("User", userSchema);
