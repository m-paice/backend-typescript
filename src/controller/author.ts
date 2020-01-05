import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import Author, { AuthorInterface } from '../models/author';
import BaseController from './BaseController';

class AuthorController extends BaseController<AuthorInterface> {
    constructor() {
        super(Author, '/author', '');
    }

    // eslint-disable-next-line class-methods-use-this
    async auth(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;

        const isUser = await Author.findOne({ username, password });

        if (!isUser) return res.status(500).json({ message: 'record not found' });

        const token = await jwt.sign({ user: isUser._id }, 'TARTARUGADOMAL', { expiresIn: '8h' });

        return res.json({
            token,
            isUser
        });
    }

    routes() {
        const routes = super.routes();

        routes.post('/auth', this.auth.bind(this));

        return routes;
    }
}

export default AuthorController;
