import express from "express";
const router = express.Router();

//homepage
router.get("/");

//get feed
router.get("/feed");
//get post page
router.get("/post/:id");

//get profile page
router.get("/user/:id");

//get auth pages
router.get("/signin");
router.get("/signup");

//make new post
router.post("/feed/new");

//delete post
router.post("/post/:id/delete");

//log in and create new user
router.post("/signin");
router.post("/signup");

export default router;
