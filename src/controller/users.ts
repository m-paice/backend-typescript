import BaseController from './BaseController';
import Users, { UserInterface } from '../models/users';

class UserController extends BaseController<UserInterface> {
    constructor() {
        super(Users, '/users', '');
    }

    routes() {
        const routes = super.routes();

        return routes;
    }
}

export default UserController;
