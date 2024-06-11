import express from "express";
import commentController from "../controllers/commentController";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

// get comments for a post
router.get("/:postId", commentController.getComments);

// create a comment
router.post("/", authenticate, commentController.createComment);

export default router; 