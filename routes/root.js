import express from "express";
import * as FeedController from "../controllers/feed.js";
const router = express.Router();

//homepage
router.get("/", (req, res, next) => res.render("home"));

//get feed
router.get("/feed", FeedController.showFeed);
//get post page
router.get("/post/:id"), FeedController.showPost;

//get profile page
router.get("/user/:id");

//get auth pages
router.get("/signin");
router.get("/signup");

//make new post
router.post("/feed/new", FeedController.createPost);

//delete post
router.post("/post/:id/delete");

//log in and create new user
router.post("/signin");
router.post("/signup");

export default router;
