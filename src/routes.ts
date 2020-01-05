import { AuthorController, PostController } from './controller';

export default [new AuthorController().routes(), new PostController().routes()];
