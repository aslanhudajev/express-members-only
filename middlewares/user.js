import asyncHandler from "express-async-handler";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      } else if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

export const validateFormInput = [
  //!Add body validation here
  (req, res, next) => {
    const validationsErrors = validationResult(req);
    if (!validationsErrors.isEmpty()) {
      if (!res.locals.POST) {
        res.locals.POST = {
          validationErrors,
        };
      } else {
        res.locals.POST.validationErrors = validationsErrors;
      }
    }

    return next();
  },
];

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

export const createUserCommit = asyncHandler(async (res) => {
  await res.locals.POST.user.save();
});

export const signin = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
  (req, res, next) => {
    return next();
  },
];
