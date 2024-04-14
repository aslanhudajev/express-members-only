import asyncHandler from "express-async-handler";
import * as userMW from "../middlewares/user.js";

export const showCurrentUserProfile = [
  userMW.getCurrentUserPosts,
  (req, res, next) => {
    res.render("./user/profile", {
      user: req.user,
      posts: res.locals.GET.posts,
      current: true,
    });
  },
];

export const showUserProfile = [
  userMW.getUser,
  userMW.getUserPosts,
  (req, res, next) => {
    res.render("./user/profile", {
      user: req.user,
      profile: res.locals.GET.profile,
      posts: res.locals.GET.posts,
      current: false,
    });
  },
];

export const showProfileEdit = (req, res, next) => {};

export const showSignUp = (req, res, next) => {
  res.render("./user/signup");
};

export const showSignIn = (req, res, next) => {
  res.render("./user/signin");
};

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
