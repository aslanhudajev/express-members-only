import mongoose from "mongoose";
import Post from "./models/Post.js";
import User from "./models/User.js";
import "dotenv/config";

await mongoose.connect(process.env.MDB_CS, { dbName: process.env.DB_NAME });

const user = new User({
  "first-name": "Aslan",
  "last-name": "Hud",
  username: "asslanoo",
  email: "aslambek.hudajev@gmail.com",
  password: "123",
});

const post = new Post({
  content: "Test",
  user: user,
});

await user.save();
await post.save();
