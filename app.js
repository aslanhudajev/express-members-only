import express, { urlencoded } from "express";
import mongoose from "mongoose";
import "dotenv/config";

import rootRouter from "./routes/root.js";

await mongoose
  .connect(process.env.MDB_CS, { dbName: process.env.DB_NAME })
  .then(() => console.log("Connected to MDB. DB = " + process.env.DB_NAME))
  .catch((error) => console.log("Failed to connect to MDB: " + error));

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(rootRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT),
);
