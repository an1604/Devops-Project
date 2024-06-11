import express, { NextFunction, Request, Response, } from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, "public/");
    },
    filename: function (req: any, file: any, cb: any) {
        const userId = req.user?.id || "default";
        const ext = file.originalname.split(".").filter(Boolean).slice(1).join(".");
        cb(null, Date.now() + "." + ext);
    },
});

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    const file = await multer({ storage: storage }).single("file");
    file(req, res, (err: any) => {
        if (err) {
            res.status(500).send(err);
        }
    });
    next();
}

export { uploadFile };
export const upload = multer({ storage: storage });
