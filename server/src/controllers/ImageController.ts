import Controller from "./Controller";
import {Methods} from "../types/Methods";
import {Request , Response, NextFunction} from "express";
import {Image} from "../models/Image";

export class ImageController extends Controller{
    constructor() {
        super();
    }
    public path = "/image";
    public routes = [
        {
            path: "",
            method: Methods.POST,
            handler: this.sendImage,
            localMiddleware: [],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.getImage,
            localMiddleware: [],
        }
    ];

    public async sendImage(req: Request, res: Response, next: NextFunction ) {
        const { context, url } = req.body;
        const data = await new Image().createImage(url, context);
        if (data) {
            return res.status(201).json(data);
        }
    }
    public async getImage(req: Request, res: Response, next: NextFunction ) {
        const data = await new Image().getImage();
        if (data) {
            // @ts-ignore
            return res.status(201).json(data[0]);
        }
    }
}