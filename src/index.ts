import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

require('dotenv').config();

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
        mongoose.connect('mongodb://root:password@127.0.0.1:27019/webchat?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };

    private routes(): void {
        this.express.get('/', (req, res) => res.send('Welcome API webchat'))
        routes.map(route => this.express.use(route));
    }
}

const server = new App().express;

server.listen(process.env.PORT, (): void => console.log('Server is online'));
