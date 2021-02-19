import App from "../src/components/app";
import {NextFunction, Request, Response} from "express";
import {Request_Methods} from "../src/types/interfaces";
import User from './model'
import {MacoreValidator} from "../src/middlewares/validation";
import SigninDto from "./signin.dto";
import Langs from './locales'
import BodyParser from "../src/configuration/bodyparser";

// const app = new App(3000 , "localhost" , null , null , null , false , Langs)
const app = new App(
    {} ,
    BodyParser
)

app.route("/" , Request_Methods.GET , async (req:Request , res:Response , next:NextFunction) => {
    res.send("Hi")
})

app.route("/new" , Request_Methods.GET , async (req:Request , res:Response , next:NextFunction) => {
    console.log(await User.create({
        name :"Ali" ,
        lastName : "pakravan" ,
        phoneNumber : "123"
    }))

    res.send("Ok")
})

app.route("/validation" , Request_Methods.POST , MacoreValidator(SigninDto) ,
    (req:Request , res:Response , next:NextFunction) => {
        res.send("Ok")
    }
)

app.listen()