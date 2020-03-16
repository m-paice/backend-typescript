import { Schema, model, Document } from 'mongoose';
import { UserInterface } from './users'

export interface MessageInterface extends Document {
    user: UserInterface;
    text: string;
}

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export default model<MessageInterface>('Messages', messageSchema);

