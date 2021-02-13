import mongoose, {
    Document,
    Error,
    Model, ModelPopulateOptions,
    QueryFindOneAndUpdateOptions,
    Schema,
    SchemaOptions
} from "mongoose";
import { ObjectId } from "bson";
import { FilterQuery, UpdateQuery } from "mongodb";
import { CustomSchemaDefinition, DeleteResponse } from "../types/mongo";
import { ORM } from "../types/mongo";

export abstract class BaseRepository<T> implements ORM<T> {
    abstract definition(): CustomSchemaDefinition<T>;

    protected options: SchemaOptions = { timestamps: true };
    protected schema: Schema;
    protected readonly _model: Model<T & Document>;

    constructor(protected collection?: string) {
        this.schema = new mongoose.Schema(this.definition(), this.options);

        this.initiateIndexes();
        this.initiatePlugins();

        this._model = mongoose.model<T & Document>(this.constructor.name, this.schema, this.collection);
    }

    protected initiateIndexes() {
    }

    protected initiatePlugins() {
    }

    async create (item: Partial<T>): Promise<T & Document> {
        try {
            return await this._model.create(item as any);
        } catch (e) {
            throw new Error(e)
        }
    }

    find(data: any): any {
        return this._model.find(data)
    }
}

