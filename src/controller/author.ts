/* eslint class-methods-use-this: ["error", { "exceptMethods": ["listAllAuthor", "createAuthor", "deleteAuthor"] }] */

import { Request, Response } from 'express';
import Author from '../models/author';

class AuthorController {
    public async listAllAuthor(req: Request, res: Response): Promise<Response> {
        const authors = await Author.find();

        return res.status(200).json({
            message: 'OK',
            data: authors,
            request: {
                type: 'GET',
                url: 'http://localhost:7878/author',
            },
        });
    }

    public async createAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const author = await Author.create(req.body);

            return res.status(200).json({
                message: 'OK',
                data: author,
                request: {
                    type: 'POST',
                    url: 'http://localhost:7878/author',
                },
            });
        } catch (e) {
            return res.status(500).json({
                message: 'Error',
                error: e.message,
                request: {
                    type: 'POST',
                    url: 'http://localhost:7878/author',
                },
            });
        }
    }

    public async deleteAuthor(req: Request, res: Response): Promise<Response> {
        try {
            const author = await Author.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                message: 'OK',
                data: author,
                request: {
                    type: 'DELETE',
                    url: `http://localhost:7878/author/${req.params.id}`,
                },
            });
        } catch (e) {
            return res.status(500).json({
                message: 'Error',
                error: e.message,
                request: {
                    type: 'DELETE',
                    url: `http://localhost:7878/author/${req.params.id}`,
                },
            });
        }
    }
}

export default new AuthorController();
