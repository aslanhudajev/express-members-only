import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/Post.js";

//! TODO: figure out middleware flow using SOLID principles

export const getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate("user")
      .exec();

    if (res.locals.GET === undefined) {
      res.locals.GET = {
        post: post,
      };
    } else {
      res.locals.GET.post = post;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }

  return next();
});

export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .sort({ "posted-date": 1 })
      .populate("user")
      .exec();

    if (!res.locals.get) {
      res.locals.GET = {
        posts: posts,
      };
    } else {
      res.locals.GET.posts = posts;
    }

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

export const validateFormInput = [
  body("content", "Post can not be empty")
    .trim()
    .isLength({ min: 1, max: 256 })
    .withMessage("Post has to be between 1 and 256 characters."),

  (req, res, next) => {
    const validationsErrors = validationResult(req);
    if (!validationResult.isEmpty()) {
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

export const createPost = asyncHandler(async (req, res, next) => {
  const post = new Post({
    ...res.body,
  });

  if (!res.locals.POST) {
    res.locals.POST = {
      post,
    };
  } else {
    res.locals.POST.post = post;
  }

  return next();
});

export const createPostCommit = asyncHandler(async (res) => {
  try {
    await res.locals.POST.post.save();
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = asyncHandler(async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.body._id });
  } catch (error) {
    console.log(error);
  }
});
