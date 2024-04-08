import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/Post.js";

//! TODO: figure out middleware flow using SOLID principles

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id })
    .populate("user")
    .exec();

  if (!res.locals.get) {
    res.locals.get = {
      post: post,
    };
  } else {
    res.locals.get.post = post;
  }

  return next();
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({})
    .sort({ "posted-date": 1 })
    .populate("user")
    .exec();

  if (!res.locals.get) {
    res.locals.get = {
      posts: posts,
    };
  } else {
    res.locals.get.posts = posts;
  }

  return next();
});

export const createPost = asyncHandler(async (req, res, next) => {
  const post = new Post({
    ...res.body,
  });

  if (!res.locals.post) {
    res.locals.post = {
      post: post,
    };
  } else {
    res.locals.post.post = post;
  }

  return next();
});

export const createPostCommit = asyncHandler(async (req, res, next) => {
  await res.locals.post.post.save();
});

export const deletePost = asyncHandler(async (req, res, next) => {
  await Post.deleteOne({ _id: req.body._id });
});
