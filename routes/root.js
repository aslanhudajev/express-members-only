import express from "express";
const router = express.Router();

router.get("/");
router.get("/feed");
router.get("/post/:id");
router.get("/user/:id");
router.get("/signin");
router.get("/signup");

router.post("/feed");
router.post("/signin");
router.post("/signup");

export default router;
