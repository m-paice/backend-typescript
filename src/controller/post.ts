/* eslint class-methods-use-this: ["error", { "exceptMethods": ["createPost", "listAllPost"] }] */
import { Request, Response } from 'express';

import Post from '../models/post';

class PostController {
    public async listAllPost(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.find().populate('author');

            return res.status(200).json({
                message: 'OK',
                data: post,
                request: {
                    type: 'GET',
                    url: 'http://localhost:7878/post',
                },
            });
        } catch (e) {
            return res.status(200).json({
                message: 'Error',
                data: e.message,
                request: {
                    type: 'GET',
                    url: 'http://localhost:7878/post',
                },
            });
        }
    }

    public async createPost(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.create(req.body);

            return res.status(200).json({
                message: 'OK',
                data: post,
                request: {
                    type: 'POST',
                    url: 'http://localhost:7878/post',
                },
            });
        } catch (e) {
            return res.status(200).json({
                message: 'Error',
                data: e.message,
                request: {
                    type: 'POST',
                    url: 'http://localhost:7878/post',
                },
            });
        }
    }
}

export default new PostController();

// Bom dia @fabio.gianzanti  tranquilo?

// Cara estou com uma dúvida tremenda em Typescript, acho que você pode me ajudar kk

// Estou criando um método publico em uma classe e não estou utilizando o this dentro
// do método, logo meu eslint acusa um erro dizendo que esperava que o método tenha o
// this.. Para resolver isso eu preciso colocar meu método com static ai resolveria
// meu caso. Mas eu preciso que esse método seja acessível em outro lugar quando eu
// estender essa classe.  Logo colocando o método com static não tenho acesso quando
// eu estendo a classe.
