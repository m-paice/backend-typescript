import { Request, Response, Router } from 'express';
import { Model, Document } from 'mongoose';

import auth from '../middlewares/auth';

class BaseController<T extends Document> {
    private model: Model<T>;

    private path: string;

    private populate: string;

    constructor(model: Model<T>, path: string, populate: string | string[]) {
        this.model = model;
        this.path = path;
        // @ts-ignore
        this.populate = populate;
    }

    async index(req: Request, res: Response): Promise<Response> {
        const response = await this.model.find().populate(this.populate);

        return res.json(response);
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const response = await this.model.findOne({ _id: id }).populate(this.populate);

        if (!response) return res.status(500).send({});

        return res.json(response);
    }

    async store(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        try {
            const data = await this.model.create(body);

            const response = await this.model.findOne({ _id: data._id }).populate(this.populate);

            return res.json(response);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { body } = req;

        try {
            const isData = await this.model.findOne({ _id: id });

            if (!isData) return res.status(500).json({ message: 'record not found' });

            await this.model.update({ _id: isData.id }, body);

            const response = await this.model.findOne({ _id: isData.id }).populate(this.populate);

            return res.json(response);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async destroy(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const isData = await this.model.findOne({ _id: id });

        if (!isData) return res.status(500).json({ message: 'record not found' });

        await this.model.deleteOne({ _id: id });

        return res.send();
    }

    routes() {
        const routes = Router();

        routes.get(this.path, this.index.bind(this));
        routes.get(`${this.path}/:id`, this.show.bind(this));
        routes.post(this.path, this.store.bind(this));
        routes.put(`${this.path}/:id`, auth, this.update.bind(this));
        routes.delete(`${this.path}/:id`, this.destroy.bind(this));

        return routes;
    }
}

export default BaseController;
