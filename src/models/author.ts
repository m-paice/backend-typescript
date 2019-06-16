import { Schema, model, Document } from 'mongoose';

interface AuthorInterface extends Document {
    firstName: string;
    lastName: string;
    email: string;
}

const authorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        required: true,
    },
});

export default model<AuthorInterface>('Author', authorSchema);
