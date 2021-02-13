import App, {ApiService} from "../src/components/app";
import {NextFunction, Request, Response} from "express";
import {Request_Methods} from "../src/types/interfaces";

const app = new App(3000)

app.route("/" , Request_Methods.GET , (req:Request , res:Response , next:NextFunction) => {
    res.send("Hi")
})

app.listen()