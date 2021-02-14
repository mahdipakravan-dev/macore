import Middleware from "../types/middleware";
import {NextFunction, Request , Response} from "express";
import {validate, ValidationError} from "class-validator";
import {plainToClass} from "class-transformer";
import {httpCodes} from "../types/interfaces";

export function MacoreValidator(type:any , callbackUrl ?: string){
    return(req:Request , res:Response , next:NextFunction) => {
        validate(plainToClass(type , req.body))
            .then(errors => {
                if(errors.length > 0) {
                    if(callbackUrl)
                        return res.redirect(callbackUrl)
                    else
                        return res.status(httpCodes.VALIDATION_ERROR).send({error : "ValidationError"})
                } else {
                    next()
                }
            })
    }
}