import { RequestHandler } from "express";
import { Post, IPost } from "../models/post";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllPosts: RequestHandler = async (req, res, next) => {
    let postList = await Post.find();
    res.status(200).json(postList);
}

export const getOnePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let post = await Post.findById(postId);
    res.status(200).json(post);
}

export const addPost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const newPost: IPost = new Post({
        username: user.username,
        message: req.body.message
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const editPost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.id;
    const updatedPost: IPost = new Post({
        _id: postId,
        username: user.username,
        message: req.body.message
    });

    await Post.findByIdAndUpdate(postId, { $set: updatedPost })

    res.status(200).json(updatedPost);
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.id;
    let result = await Post.findByIdAndDelete(postId);
    res.status(200).json(result);
}