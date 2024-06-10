import express from "express";
const router = express.Router();
import authController from "../controllers/authController";
import { upload } from "../middlewares/fileHandaling";

router.get("/", (req, res) => {
    res.send("in auth");
});

router.post("/register" ,upload.single("file"), authController.register);

router.post("/login", authController.login);

router.post("/google", authController.googleSignin);

router.get("/refresh", authController.refresh);

router.get("/logout", authController.logout);


export default router;
