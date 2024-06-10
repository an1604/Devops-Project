import { Request, Response } from 'express';
import postModel, { Post } from '../models/postModel';
import path from 'path';

const getPosts = async (req: any, res: Response) => {
    try {
        const posts = await postModel.find();
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getPost = async (req: any, res: Response) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createPost = async (req: any, res: Response) => {
    console.log(req.file?.path);
    console.log(req.body);

    const post: Post = req.body;
    post.userId = req.user._id;
    post.date = new Date();
    post.numComments = 0;
    post.imgUrl = req.file.path;
    const newPost = new postModel(post);
    try {
        await newPost.save();
        res.status(201).send(newPost);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updatePost = (req: any, res: Response) => {
    const id = req.params.id;
    const post: Post = req.body;
    postModel.findByIdAndUpdate(id, post, (err: any, post: Post) => {
        if (err) {
            res.status(500).send
            return;
        }
        res.status(200).send(post);
    });
}

const deletePost = (req: any, res: Response) => {
    const id = req.params.id;
    postModel.findByIdAndDelete(id, (err: any, post: Post) => {
        if (err) {
            res.status(500).send
            return;
        }
        res.status(200).send(post);
    });
}

const getPostPhoto = async (req: any, res: Response) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        const filePath = path.join(__dirname, "../../", post.imgUrl);
        res.status(200).sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: "Post not found" });
    }
}

const getPostsByUser = async (req: any, res: Response) => {
    console.log("req.user: ", req.user);
    try {
        const posts = await postModel.find({ userId: req.user._id });
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export default {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostPhoto,
    getPostsByUser
}