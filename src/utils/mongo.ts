import mongoose, {
    Document,
    Error,
    Model, ModelPopulateOptions,
    QueryFindOneAndUpdateOptions,
    Schema,
    SchemaOptions
} from "mongoose";
import { ObjectId } from "bson";
import { InternalServerError } from "../components/error";
import { FilterQuery, UpdateQuery } from "mongodb";
import { CustomSchemaDefinition, DeleteResponse } from "../types/mongo";
import { Repository } from "../types/mongo";

export abstract class MongoBaseRepository<T> implements Repository<T> {
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
            throw this.getInternalServerError("insert", e, item);
        }
    }

    async createOrFind (item: Partial<T> | FilterQuery<T>): Promise<T & Document> {
        try {
            return await this.create(item as Partial<T>);
        }
        catch (e) {
            if (e.details && e.details.error && e.details.error.code === 11000) {
                return (await this.findOne(item))!;
            }
            else {
                throw this.getInternalServerError("create_or_find", e, "CREATE_OR_FIND");
            }
        }
    }

    async findOrCreate(item: Partial<T> | FilterQuery<T>): Promise<T & Document> {
        try {
            let entry = await this.findOne(item);
            if (!entry) {
                entry = await this.create(item as Partial<T>);
            }
            return entry;
        }
        catch (e) {
            throw this.getInternalServerError("create_or_find", e, "CREATE_OR_FIND");
        }
    }

    async insertMany (items: Array<Partial<T>>): Promise<Array<T & Document>> {
        try {
            return await this._model.insertMany(items);
        } catch (e) {
            throw this.getInternalServerError("insert_many", e, items);
        }
    }

    async update (id: string, item: Partial<T> | UpdateQuery<T>): Promise<T & Document | null> {
        try {
            return await this._model.findByIdAndUpdate(id, item as any);
        } catch (e) {
            throw this.getInternalServerError("update", e, item);
        }
    }

    async updateMany(condition: Partial<T> | FilterQuery<T>, item: Partial<T> | UpdateQuery<T>) {
        try {
            return await this._model.updateMany(condition as any, item as any);
        }
        catch (e) {
            throw this.getInternalServerError("update", e, item);
        }
    }

    async delete (id: string): Promise<boolean> {
        try {
            return !!await this._model.findByIdAndRemove(id);
        } catch (e) {
            throw this.getInternalServerError("delete", e, "DELETE");
        }
    }

    async deleteOne (item: Partial<T> | FilterQuery<T>): Promise<T & Document | null> {
        try {
            return await this._model.findOneAndRemove(item as any);
        } catch (e) {
            throw this.getInternalServerError("delete_one", e, "DELETE");
        }
    }

    async deleteMany (item: Partial<T> | FilterQuery<T>): Promise<DeleteResponse> {
        try {
            return await this._model.deleteMany(item as any);
        } catch (e) {
            throw this.getInternalServerError("delete_many", e, "DELETE_MANY");
        }
    }

    async deleteAll (): Promise<DeleteResponse> {
        try {
            return await this._model.remove({});
        } catch (e) {
            throw this.getInternalServerError("delete_all", e, "DELETE_ALL");
        }
    }

    find (item: Partial<T> | FilterQuery<T>) {
        return this._model.find(item as any);
    }

    async findOne (item: Partial<T> | FilterQuery<T>): Promise<T & Document | null> {
        try {
            return await this._model.findOne(item as any);
        } catch (e) {
            throw this.getInternalServerError("find_one", e, item);
        }
    }

    async findById (id: string | ObjectId, select?: string): Promise<T & Document | null> {
        try {
            return await (select ? this._model.findById(id).select(select) : this._model.findById(id));
        } catch (e) {
            throw this.getInternalServerError("find_by_id", e, "FIND");
        }
    }

    async findAndUpdate (condition: Partial<T> | FilterQuery<T>, item: Partial<T> | UpdateQuery<T>, options: QueryFindOneAndUpdateOptions = { new: true }): Promise<T & Document | null> {
        try {
            return await this._model.findOneAndUpdate(condition as any, item as any, options);
        } catch (e) {
            throw this.getInternalServerError("find_and_updated", e, item);
        }
    }

    async paginate (filter: Partial<T> | FilterQuery<T>, options?: object) {
        // @ts-ignore
        return await this._model.paginate(filter, options);
    }

    async aggregatePaginate (filter: Array<object>, options?: object) {
        // @ts-ignore
        return await this._model.aggregatePaginate(this._model.aggregate(filter), options);
    }

    async populate (filter: Partial<T> | FilterQuery<Partial<T>>, populate: ModelPopulateOptions | ModelPopulateOptions[] | string | string[]) {
        try {
            return await this._model.populate(filter, populate as ModelPopulateOptions);
        }
        catch (e) {
            throw this.getInternalServerError("aggregate", e, "Populate Query");
        }
    }

    async findOnePopulate (item: Partial<T> | FilterQuery<T>, populate: ModelPopulateOptions | ModelPopulateOptions[] | string | string[], select?: string): Promise<T & Document | null> {
        try {
            return (await this._model.findOne(item as any).populate(populate).select(select));
        } catch (e) {
            throw this.getInternalServerError("find_one_populate", e, item);
        }
    }

    async findAndPopulate (item: Partial<T> | FilterQuery<T>, populate: ModelPopulateOptions | ModelPopulateOptions[] | string | string[], select?: string): Promise<Array<T & Document>> {
        try {
            return (await this._model.find(item as any).populate(populate).select(select));
        } catch (e) {
            throw this.getInternalServerError("find_one_populate", e, item);
        }
    }

    async getCount (condition: Partial<T> | FilterQuery<T>): Promise<Number> {
        try {
            return +await this._model.count(condition as any);
        } catch (e) {
            throw this.getInternalServerError("count", e, "Count Query");
        }
    }

    async aggregate<S = any>(condition: Array<object>, allowDiskUse = false): Promise<S> {
        try {
            const promise = this._model.aggregate(condition);
            return allowDiskUse ? await promise.allowDiskUse(true) : await promise as any;
        } catch (e) {
            throw this.getInternalServerError("aggregate", e, "Aggregate Query");
        }
    }

    protected getInternalServerError = (errorPrefix: string, error: Error, item: any) => {
        console.log("*********************** INTERNALLLLLLLL ******************8")
        return new InternalServerError(errorPrefix + "_" + this._model.modelName, error.message, {item, error});
    }
}

