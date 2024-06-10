import userModel from "../models/userModel";
import path from "path";

const getUser = async (req: any, res: any) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req: any, res: any) => {
    try {
        const user = await userModel.findById(req.user._id);
        console.log(req.body);
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.file) {
            user.imgUrl = req.file.path;
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserPhoto = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await userModel.findById(id);
        const filePath = path.join(__dirname, "../../", user.imgUrl);
        console.log(filePath);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: "User not found" });
    }
}

const getUserUsername = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        res.json(user.username);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUser,
    updateUser,
    getUserPhoto,
    getUserUsername
}