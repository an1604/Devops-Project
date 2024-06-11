import mongoose from "mongoose";

export interface Comment {
    postId: string;
    content: string;
    name: string;
    date: Date;
}

const commentSchema = new mongoose.Schema<Comment>({
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

export default mongoose.model<Comment>("Comment", commentSchema);