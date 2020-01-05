import Post, { PostInterface } from '../models/post';
import BaseController from './BaseController';

class PostController extends BaseController<PostInterface> {
    constructor() {
        super(Post, '/post', 'author');
    }

    routes() {
        const routes = super.routes();

        return routes;
    }
}

export default PostController;
