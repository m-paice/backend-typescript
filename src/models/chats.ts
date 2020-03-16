import { Schema, model, Document } from 'mongoose';

import { MessageInterface } from './messages';
import { UserInterface } from './users';

export interface ChatInterface extends Document {
    messages: [MessageInterface];
    users: [UserInterface];
    lastMessage: MessageInterface;
    isOpen: boolean;
}

const chatSchema = new Schema({
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Messages',
        },
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Messages',
    },
    isOpen: Boolean,
});

export default model<ChatInterface>('Chats', chatSchema);
