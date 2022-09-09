"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.addPost = exports.getOnePost = exports.getAllPosts = void 0;
const post_1 = require("../models/post");
const auth_1 = require("../services/auth");
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let postList = yield post_1.Post.find();
    res.status(200).json(postList);
});
exports.getAllPosts = getAllPosts;
const getOnePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let postId = req.params.id;
    let post = yield post_1.Post.findById(postId);
    res.status(200).json(post);
});
exports.getOnePost = getOnePost;
const addPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const newPost = new post_1.Post({
        username: user.username,
        message: req.body.message
    });
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.addPost = addPost;
const editPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.id;
    const updatedPost = new post_1.Post({
        _id: postId,
        username: user.username,
        message: req.body.message
    });
    yield post_1.Post.findByIdAndUpdate(postId, { $set: updatedPost });
    res.status(200).json(updatedPost);
});
exports.editPost = editPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.id;
    let result = yield post_1.Post.findByIdAndDelete(postId);
    res.status(200).json(result);
});
exports.deletePost = deletePost;
