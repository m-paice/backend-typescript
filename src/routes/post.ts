import { Router } from 'express';

import PostController from '../controller/post';

const route = Router();

route.get('/post', PostController.listAllPost);
route.post('/post', PostController.createPost);

export default route;
