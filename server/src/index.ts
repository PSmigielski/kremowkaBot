import Controller from "./controllers/Controller";
import { json } from "express";
import errorHandler from "./middleware/errorHandler";
import Server from "./config/Server";
import {ImageController} from "./controllers/ImageController";

const controllers: Array<Controller> = [new ImageController()];
const globalMiddleware = [json()];
const errorHandlers = [errorHandler];

new Server(controllers, globalMiddleware, errorHandlers).startServer();
