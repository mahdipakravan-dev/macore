import {MongoBaseRepository} from "../src/utils/mongo";
import {CustomSchemaDefinition} from "../src/types/mongo";

export interface IUsers {
    name : string ,
    lastName : string ,
    phoneNumber : string
}

class User extends MongoBaseRepository<IUsers>{

    definition(): CustomSchemaDefinition<IUsers> {
        return {
            name : {type : String , required : true} ,
            lastName : {type : String , required : true} ,
            phoneNumber : {type : String , required : true , unique : true}
        };
    }

    protected initiateIndexes(): void {

    }
    protected initiatePlugins(): void {
    }

}

export default new User("users")