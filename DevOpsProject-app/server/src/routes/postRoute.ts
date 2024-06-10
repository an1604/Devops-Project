import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middlewares/authenticate";
import { upload } from "../middlewares/fileHandaling";

const router = express.Router();
// get all posts
router.get("/", postController.getPosts);

// get a single post
router.get("/:id", authenticate, postController.getPost);

router.get("/byuser", authenticate, postController.getPostsByUser);

// create a post
router.post("/", authenticate, upload.single("file"), postController.createPost);

// update a post
router.put("/:id", authenticate, postController.updatePost);

// delete a post
router.delete("/:id", authenticate, postController.deletePost);

router.get("/photo/:id", postController.getPostPhoto);


export default router;
