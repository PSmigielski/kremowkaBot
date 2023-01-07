import Controller from "./controllers/Controller";
import { json } from "express";
import errorHandler from "./middleware/errorHandler";
import Server from "./config/Server";

const controllers: Array<Controller> = [];
const globalMiddleware = [json()];
const errorHandlers = [errorHandler];

new Server(controllers, globalMiddleware, errorHandlers).startServer();
