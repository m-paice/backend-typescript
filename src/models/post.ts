import { Schema, model, Document } from 'mongoose';

interface AuthorInterface {
    firstName: string;
    lastName?: string;
    email: string;
}

interface FilesInterface {
    name: string;
    originalName: string;
    size: number;
    type: string;
}

interface PostInterface extends Document {
    author: AuthorInterface;
    title: string;
    subTitle?: string;
    files: FilesInterface[];
    body: string;
}

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: String,
    files: [],
    body: {
        type: String,
        required: true,
    },
});

export default model<PostInterface>('Post', postSchema);
