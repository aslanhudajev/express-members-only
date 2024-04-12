import express, { urlencoded } from "express";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";

import rootRouter from "./routes/root.js";
import passport from "passport";

await mongoose
  .connect(process.env.MDB_CS, { dbName: process.env.DB_NAME })
  .then(() => console.log("Connected to MDB. DB = " + process.env.DB_NAME))
  .catch((error) => console.log("Failed to connect to MDB: " + error));

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use(express.static("./public"));
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(rootRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT),
);
