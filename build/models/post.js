"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.Post = Post;
