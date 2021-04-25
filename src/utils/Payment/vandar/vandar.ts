import {PaymentStrategy} from "../index";
import {
    IToken_Vandar,
    ITransaction_Vandar,
    IVerify_Vandar,
    OToken_Vandar,
    OTransaction_Vandar,
    OVerify_Vandar
} from "./types";
import ApiService from "../../apiService";
import {Request_Methods} from "../../../types/interfaces";

export class VandarPaymentStrategy implements PaymentStrategy<
        IToken_Vandar , Promise<OToken_Vandar>,
        ITransaction_Vandar , Promise<OTransaction_Vandar> ,
        IVerify_Vandar , Promise<OVerify_Vandar>
    >{

    private apiService : ApiService

    constructor() {
        this.apiService = new ApiService(process.env.BASE_URL || "")
    }

    /**
     * @param {amount , factorNumber}
     * amount : REQUIRED NUMBER (RIAL)
     * factorNumber : REQUIRED STRING (You Were Created This)
     */
    getToken(payload: IToken_Vandar): Promise<OToken_Vandar> {
        return new Promise((resolve , reject) => {
            const data = {
                api_key : process.env.VANDAR_API_KEY ,
                amount : payload.amount ,
                factorNumber : payload.factorNumber ,
                callback_url : process.env.VANDAR_CALLBACK_URL
            }
            this.apiService.callService(process.env.VANDAR_GET_TOKEN_URL as string , Request_Methods.POST , data)
                .then((result : OToken_Vandar) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
            })
        })
    }

    /**
     * @param {token}
     * token : REQUIRED STRING (Created in Previous Part)
     */
    transaction(payload : ITransaction_Vandar): Promise<OTransaction_Vandar> {
        return new Promise((resolve , reject) => {
            const data = {
                api_key : process.env.VANDAR_API_KEY ,
                token : payload.token
            }
            this.apiService.callService(process.env.VANDAR_TRANSACTION_URL as string , Request_Methods.POST , data)
                .then((result : OToken_Vandar) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * @param {token}
     * token : REQUIRED STRING (Created in Previous Part)
     */
    verify(payload : IVerify_Vandar): Promise<OVerify_Vandar> {
        return new Promise((resolve , reject) => {
            const data = {
                api_key : process.env.VANDAR_API_KEY ,
                token : payload.token
            }
            this.apiService.callService(process.env.VANDAR_VERIFY_URL as string , Request_Methods.POST , data)
                .then((result : OToken_Vandar) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}