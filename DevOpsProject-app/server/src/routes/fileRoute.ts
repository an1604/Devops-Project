import express, { Request, Response } from "express";
const router = express.Router();
import { upload } from "../middlewares/fileHandaling";

router.post("/",upload.single("file"), (req: any, res: Response) => {
  console.log(req.file);
  res.json({ url: req.file?.path });
});

export = router;
