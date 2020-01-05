import { Schema, model, Document } from 'mongoose';

export interface AuthorInterface extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
}

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model<AuthorInterface>('Author', authorSchema);
