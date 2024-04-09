import asyncHandler from "express-async-handler";
import * as postMW from "../middlewares/post.js";

export const showFeed = [
  postMW.getPosts,
  (req, res, next) => {
    res.render("feed", { posts: req.locals.GET.posts });
  },
];

export const showPost = [
  postMW.getPost,
  (req, res, next) => {
    res.render("post", { post: req.locals.GET.post });
  },
];

export const createPost = [
  postMW.validateFormInput,
  postMW.createPost,
  asyncHandler(async (req, res, next) => {
    if (!res.locals.POST.validationErrors) {
    } else {
      await postMW.createPostCommit(res);
    }
  }),
];

export const showDeletePostForm = [
  postMW.getPost,
  (req, res, next) => {
    postMW.render("./post/delete", { post: req.locals.GET.post });
  },
];
