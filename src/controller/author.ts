import Author, { AuthorInterface } from '../models/author';
import BaseController from './BaseController';

class AuthorController extends BaseController<AuthorInterface> {
    constructor() {
        super(Author, '/author', '');
    }

    routes() {
        const routes = super.routes()

        return routes;
    }
}

export default AuthorController;
