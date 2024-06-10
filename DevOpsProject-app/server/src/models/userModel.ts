import mongoose from "mongoose";

export interface UserType {
    username?: string;
    email: string;
    password: string;
    imgUrl?: string;
    _id?: string;
    refreshTokens?: string[];
    posts?: [];
}

const userSchema = new mongoose.Schema<UserType>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    refreshTokens: {
        type: [String],
        required: false,
    },
    posts: {
        type: [Object],
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
});

export default mongoose.model<UserType>("User", userSchema);