import mongoose from "mongoose";
import { DateTime } from "luxon";
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

postSchema.virtual("read-date").get(function () {
  return DateTime.fromJSDate(this["posted-date"]).toLocaleString(
    DateTime.DATETIME_MED,
  );
});

export default mongoose.model("Post", postSchema);
