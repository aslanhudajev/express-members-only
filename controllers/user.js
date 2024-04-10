import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import * as userMW from "../middlewares/user.js";

export const showSignUp = (req, res, next) => {
  res.render("./user/signup");
};

export const showSignIn = (req, res, next) => {
  res.render("./user/signin");
};

export const createUser = asyncHandler(async (req, res, next) => {
  res.redirect("./user/signin");
});

export const deleteUser = asyncHandler(async (req, res, next) => {});
