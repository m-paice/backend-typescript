import Chats, { ChatInterface } from '../models/chats';
import BaseController from './BaseController';

class ChatsController extends BaseController<ChatInterface> {
    constructor() {
        super(Chats, '/chats', ['users', 'messages', 'lastMessage']);
    }

    routes() {
        const routes = super.routes();

        return routes;
    }
}

export default ChatsController;
