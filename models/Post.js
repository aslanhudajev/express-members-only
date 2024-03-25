import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    maxLength: 256,
  },
  "posted-date": {
    type: Date,
    default: Date.now(),
  },
});

postSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

export default mongoose.model("Post", postSchema);
