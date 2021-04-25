import Middleware from '../types/middleware'
import {Request , Response , NextFunction} from "express";

export default new class AllowOriginMd extends Middleware{
    handle(req: Request , res: Response , next: NextFunction) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Range");
        next()
    }
}