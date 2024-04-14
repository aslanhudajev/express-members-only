import asyncHandler from "express-async-handler";
import * as postMW from "../middlewares/post.js";

export const showFeed = [
  postMW.getPosts,
  (req, res, next) => {
    res.render("feed", { posts: res.locals.GET.posts, user: req.user });
  },
];

export const showPost = [
  postMW.getPost,
  (req, res, next) => {
    res.render("post", { post: res.locals.GET.post, user: req.user });
  },
];

export const createPost = [
  postMW.validateFormInput,
  postMW.getPosts,
  postMW.createPost,
  asyncHandler(async (req, res, next) => {
    if (res.locals.POST.validationErrors) {
      res.redirect("/feed");
    } else {
      await postMW.createPostCommit(res);
      res.redirect("/feed");
    }
  }),
];

export const showDeletePostForm = [
  postMW.getPost,
  (req, res, next) => {
    postMW.render("./post/delete", {
      post: req.locals.GET.post,
      user: req.user,
    });
  },
];
