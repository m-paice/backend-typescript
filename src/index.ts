import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

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
            useUnifiedTopology: true
        });
    };

    private routes(): void {
        routes.map(route => this.express.use(route));
    }
}

const server = new App().express;

server.listen(3333, (): void => console.log('Server is online'));
