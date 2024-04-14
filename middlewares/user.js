import { Strategy as LocalStrategy } from "passport-local";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Identicon from "identicon.js";
import passport from "passport";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (error, result) => {
        if (result === false) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    "first-name": user["first-name"],
    "last-name": user["last-name"],
    username: user.username,
    identicon: user.identicon,
    email: user.email,
  });
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

export const getCurrentUserPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id })
    .populate("user", "username identicon")
    .sort({ "posted-date": -1 })
    .exec();

  if (!res.locals.GET) {
    res.locals.GET = {
      posts,
    };
  } else {
    res.locals.GET.posts = posts;
  }

  return next();
});

export const getUser = asyncHandler(async (req, res, next) => {
  const profile = await User.findOne(
    { _id: req.params.id },
    "first-name last-name username email identicon",
  ).exec();

  if (!res.locals.GET) {
    res.locals.GET = {
      profile,
    };
  } else {
    res.locals.GET.profile = profile;
  }

  return next();
});

export const getUserPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.id })
    .populate("user", "username identicon")
    .sort({ "posted-date": -1 })
    .exec();

  if (!res.locals.GET) {
    res.locals.GET = {
      posts,
    };
  } else {
    res.locals.GET.posts = posts;
  }

  return next();
});

export const validateFormInput = [
  body("first-name", "First name can not be empty")
    .trim()
    .escape()
    .isLength({ min: 1, max: 30 }),
  body("last-name", "First name can not be empty")
    .trim()
    .escape()
    .isLength({ min: 1, max: 30 }),
  body("username", "Username can not be empty")
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username has to be between 3 and 30 character."),
  body("email", "Email can not be empty")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email has to be valid"),
  body(
    "password",
    "Password has to be atleast 8 characters long, including atleast 1 uppercase character and 1 number.",
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  }),
  body("password-confirm", "Passwords confirmation can not be empty")
    .custom((value, { req }) => (value === req.body.password ? true : false))
    .withMessage("Passwords do not match"),

  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      if (!res.locals.POST) {
        res.locals.POST = {
          validationErrors,
        };
      } else {
        res.locals.POST.validationErrors = validationErrors;
      }
    }

    return next();
  },
];

export const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }

    const user = new User({
      ...req.body,
      password: hash,
    });

    delete user["password-confirm"];

    const identicon = new Identicon(
      crypto.randomBytes(20).toString(),
      100,
    ).toString();
    user.identicon = identicon;

    if (!res.locals.POST) {
      res.locals.POST = {
        user,
      };
    } else {
      res.locals.POST.user = user;
    }

    return next();
  });
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

export const signout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
  });

  return next();
};
