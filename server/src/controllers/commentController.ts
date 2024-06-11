import { Request, Response } from "express";
import commentModel from "../models/commentModel";
import postModel from "../models/postModel";


const createComment = async (req: any, res: Response) => {
    const postId = req.body.postId;
    const content = req.body.content;
    const name = req.body.name;
    if (!postId || !content || !name) {
        return res.status(400).send("missing postId or content or name");
    }
    try {
        const comment = await commentModel.create(
            {
                'postId': postId,
                'content': content,
                'name': name,
                'date': new Date()
            });
        plusComment(postId);
        res.status(201).send(comment)
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const plusComment = async (id: string) => {
    try {
        const post  = await postModel.findById(id);
        if (post) {
            post.numComments = post.numComments + 1;
            await post.save();
        }
    } catch (error) {
        console.log(error);
    }
}


// return comments by postId
const getComments = async (req: Request, res: Response) => {
    const postId = req.params.postId;
    if (!postId) {
        return res.status(400).send("missing postId");
    }
    try {
        const comments = await commentModel.find({ 'postId': postId });
        res.status(200).send(comments)
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

export default { createComment, getComments };
