import * as mongoose from "mongoose";
import {MongoBaseRepository} from "../lib/utils/mongo";
import {SchemaDefinition} from "mongoose";

export interface IUser extends mongoose.Document{
    name : string
    family : string
}

class User extends MongoBaseRepository<IUser>{

    define(): SchemaDefinition {
        return{
            name : String,
            family: String
        }
    }
}

const userModel = new User()

export default userModel