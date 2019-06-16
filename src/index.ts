import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import routeAuthor from './routes/author';
import routePost from './routes/post';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(morgan('dev'));
    }

    private database = (): void => {
        mongoose.connect('mongodb://root:password@127.0.0.1:27019/blog?authSource=admin', {
            useNewUrlParser: true,
        });
    };

    private routes(): void {
        this.express.use(routeAuthor);
        this.express.use(routePost);
    }
}

const server = new App().express;

server.listen(7878, (): void => console.log('Server is online'));
