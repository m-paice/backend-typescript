import { MessageController, ChatController, UserController } from './controller';

export default [new MessageController().routes(), new ChatController().routes(), new UserController().routes()];
