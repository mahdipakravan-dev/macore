import mongoose , {SchemaOptions , Schema , Model , Document} from 'mongoose'
import {ORM} from "../types/interfaces";
import {CustomSchemaDefinition} from "../types/mongo";

export abstract class MongoBaseRepository<ISchema> implements ORM<ISchema>{

    abstract define(): CustomSchemaDefinition<ISchema>

    protected options: SchemaOptions = { timestamps: true };
    protected schema: Schema;
    protected readonly _model: Model<ISchema & Document>;

    constructor(protected collection:string) {
        // @ts-ignore
        this.schema = new mongoose.Schema(this.define(), this.options);

        this.initialIndexes();
        this.initialPlugins();

        this._model = mongoose.model<ISchema & Document>(this.constructor.name, this.schema, this.collection);
    }

    initialIndexes(){}

    initialPlugins(){}

    async create(data: any): Promise<ISchema & Document> {
        try {
            return await this._model.create(data) 
        }catch (e){
            throw new Error(e)
        }
    }

    find(data: Partial<ISchema>){
        return this._model.find(data as any)
    }
}