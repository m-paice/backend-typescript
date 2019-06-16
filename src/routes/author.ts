import express from 'express';
import AuthorController from '../controller/author';

const route = express.Router();

route.get('/author', AuthorController.listAllAuthor);
route.post('/author', AuthorController.createAuthor);
route.delete('/author/:id', AuthorController.deleteAuthor);

export default route;
