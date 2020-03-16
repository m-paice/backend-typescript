import BaseController from './BaseController';
import Message, { MessageInterface } from '../models/messages';

class MessageController extends BaseController<MessageInterface> {
    constructor() {
        super(Message, '/messages', 'users');
    }

    routes() {
        const routes = super.routes();

        return routes;
    }
}

export default MessageController;
