import { Document, Schema, Model, model } from 'mongoose';

interface IPost extends Document {
    username: string;
    message: string;
    datePosted?: number;
}

const postSchema: Schema = new Schema({
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

const Post: Model<IPost> = model('Post', postSchema);

export { IPost, Post };