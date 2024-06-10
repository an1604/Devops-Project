import mongoose from "mongoose";
import { UserType } from "./userModel";

export interface Post {
    userId: string;
    title: string;
    content: string;
    imgUrl: string;
    _id: string;
    date: Date;
    numComments: number;
}

const postSchema = new mongoose.Schema<Post>({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    numComments: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<Post>("Post", postSchema);