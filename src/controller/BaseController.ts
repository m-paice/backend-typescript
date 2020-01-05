import { Request, Response, Router } from 'express';
import { Model, Document } from 'mongoose';

class BaseController<T extends Document> {
    private model: Model<T>;

    private path: string;

    constructor(model: Model<T>, path: string) {
        this.model = model;
        this.path = path;
    }

    async index(req: Request, res: Response): Promise<Response> {
        const response = await this.model.find();

        return res.json(response);
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const response = await this.model.findOne({ _id: id });

        if (!response) return res.send({});

        return res.json(response);
    }

    async store(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        const response = await this.model.create(body);

        return res.json(response);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { body } = req;

        const isData = await this.model.findOne({ _id: id });

        if (!isData) return res.json({ message: 'record not found' });

        await this.model.update({ _id: isData.id }, body);

        const response = await this.model.findOne({ _id: isData.id });

        return res.json(response);
    }

    async destroy(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const isData = await this.model.findOne({ _id: id });

        if (!isData) return res.json({ message: 'record not found' });

        await this.model.deleteOne({ _id: id });

        return res.send();
    }

    routes() {
        const routes = Router();

        routes.get(this.path, this.index.bind(this));
        routes.get(`${this.path}/:id`, this.show.bind(this));
        routes.post(this.path, this.store.bind(this));
        routes.put(`${this.path}/:id`, this.update.bind(this));
        routes.delete(`${this.path}/:id`, this.destroy.bind(this));

        return routes;
    }
}

export default BaseController;
