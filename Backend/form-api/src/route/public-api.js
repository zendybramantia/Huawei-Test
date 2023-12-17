import express from "express"

import userController from "../controler/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);       
publicRouter.get('/api/users/:email', userController.getByEmail);
publicRouter.get('/api/users', userController.getUsers);

export{
    publicRouter
}