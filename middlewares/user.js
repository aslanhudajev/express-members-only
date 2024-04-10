import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

export const validateFormInput = [];

export const createUser = (req, res, next) => {
  const user = new User({
    ...req.body,
  });

  delete user["password-confirm"];

  if (!res.locals.POST) {
    res.locals.POST = {
      user,
    };
  } else {
    res.locals.POST.user = user;
  }

  return next();
};
