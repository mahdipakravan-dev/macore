import {VandarPaymentStrategy} from "../src/utils/Payment/vandar/vandar";
import {PaymentStrategy} from "../src/utils/Payment";


/*‌ٰ Vandar */
const VandarPayment = new VandarPaymentStrategy()
VandarPayment.getToken({factorNumber : "test" , amount : 10000}) // Return A Token
VandarPayment.verify({token : "123"})
VandarPayment.transaction({token : "123"})

/* Custom Payment */
class customPayment extends PaymentStrategy<any, any, any, any, any, any>{

    getToken(payload: any): any {
    }

    transaction(payload: any): any {
    }

    verify(payload: any): any {
    }

}
