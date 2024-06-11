import express from "express";
import authenticate from "../middlewares/authenticate";
import userController from "../controllers/userController";
import { upload } from "../middlewares/fileHandaling";

const router = express.Router();

// get user
router.get("/", authenticate, userController.getUser);
router.put("/", authenticate,upload.single('file') ,userController.updateUser);
router.get("/photo/:id", userController.getUserPhoto);
router.get("/username/:id", userController.getUserUsername);

export default router;