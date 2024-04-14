import asyncHandler from "express-async-handler";
import * as userMW from "../middlewares/user.js";

export const showSignUp = (req, res, next) => {
  res.render("./user/signup");
};

export const showSignIn = (req, res, next) => {
  res.render("./user/signin");
};

export const createUser = [
  userMW.validateFormInput,
  userMW.createUser,
  asyncHandler(async (req, res, next) => {
    if (res.locals.POST.validationErrors) {
      res.render("./user/signup", {
        errors: res.locals.POST.validationErrors.array(),
      });
    } else {
      await userMW.createUserCommit(res);
      res.redirect("./signin");
    }
  }),
];

export const updateUser = asyncHandler(async (req, res, next) => {});

export const deleteUser = asyncHandler(async (req, res, next) => {});

export const signin = [
  userMW.signin,
  (req, res, next) => {
    res.redirect("/");
  },
];

export const signout = [
  userMW.signout,
  (req, res, next) => {
    res.redirect("/feed");
  },
];
