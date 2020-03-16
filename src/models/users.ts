import { Schema, model, Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
}

const userSchema = new Schema({
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

export default model<UserInterface>('Users', userSchema);
