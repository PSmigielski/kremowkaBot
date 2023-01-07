import { NextFunction, Request, Response } from "express";
import {Methods} from "./Methods";

interface IRoute {
    path: string;
    method: Methods;
    handler: any;
    localMiddleware: Array<
        (
            req: Request,
            res: Response,
            next: NextFunction,
        ) =>
            | void
            | ((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => Promise<void>)
    >;
}

export default IRoute;