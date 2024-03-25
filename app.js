import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

await mongoose
  .connect(process.env.MDB_CS, { dbName: process.env.DB_NAME })
  .then(() => console.log("Connected to MDB. DB = " + process.env.DB_NAME))
  .catch((error) => console.log("Failed to connect to MDB: " + error));

const app = express();
app.set("view enging", "ejs");
app.set("views", "./views");

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
