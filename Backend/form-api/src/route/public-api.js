import express from "express"

import userController from "../controler/user-controller.js";
import { jwtAuthorizationMiddleware } from "../middleware/auth-middleware.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);       
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/users/:email', jwtAuthorizationMiddleware(), userController.getByEmail);
publicRouter.get('/api/users',jwtAuthorizationMiddleware() ,userController.getUsers);

export{
    publicRouter
}