import express from "express";
import * as FeedController from "../controllers/feed.js";
import * as UserController from "../controllers/user.js";
const router = express.Router();

//homepage
router.get("/", (req, res, next) => res.render("home", { user: req.user })); //* DONE

//get feed
router.get("/feed", FeedController.showFeed); //* DONE
//get post page
router.get("/post/:id"), FeedController.showPost; //* DONE

//get current user profile page
router.get("/profile", UserController.showCurrentUserProfile); //* DONE
//get current user profile edit form
router.get("/profile/edit", UserController.showProfileEdit); //! NOT DONE
//get user page
router.get("/user/:id", UserController.showUserProfile); //* DONE

//get sign in and signout forms
router.get("/signin", UserController.showSignIn); //* DONE
router.get("/signup", UserController.showSignUp); //* DONE

//create new post
router.post("/feed/new", FeedController.createPost); //* DONE

//delete post
router.post("/post/:id/delete"); //! NOT DONE

//edit current user profile
router.post("/profile/edit", UserController.updateUser); //! NOT DONE

//sign in, sign out and create new user
router.post("/signin", UserController.signin); //* DONE
router.post("/signup", UserController.createUser); //* DONE
router.post("/signout", UserController.signout); //* DONE

export default router;
