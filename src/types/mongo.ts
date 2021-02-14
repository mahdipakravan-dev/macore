import { Schema, SchemaType, SchemaTypeOpts } from "mongoose";
import { RequiredKeys } from "./global";
import { ObjectId } from "bson";

export type CustomSchemaDefinition<T>  = {
    [key in Exclude<RequiredKeys<T>, "createdAt" | "updatedAt" >]: SchemaTypeOpts<any> | Schema | SchemaType;
};

export interface Repository<T> {
    create(item: any): Promise<T>;
    createOrFind(item: any): Promise<T>;
    findOrCreate(item: any): Promise<T>;
    insertMany(items: Array<any>): Promise<T[]>;
    update(id: string | number | ObjectId, item: any, options?: any): Promise<T | null | void>;
    updateMany(condition: any, item: any): Promise<any>;
    delete(id: string | number | ObjectId): Promise<boolean>;
    deleteOne(item: any): Promise<any>;
    deleteMany(item: any): Promise<any>;
    deleteAll(): Promise<any>;
    find(item: any): any;
    findOne(item: any): Promise<T | null>;
    findById(id: string | number | ObjectId, select?: string | Array<any>): Promise<T | null>;
    findAndUpdate(condition: any, item: any, options?: any): Promise<T | null | void>;
    paginate(filter: any, options?: any): Promise<any>;
    aggregatePaginate?(filter: any, options?: any): Promise<any>;
    populate?(filter: any, populate: any): Promise<any>;
    findOnePopulate?(item: any, populate: any, select?: any): Promise<T | null>;
    findAndPopulate?(item: any, populate: any, select?: any): Promise<T[]>;
    getCount(condition: any): Promise<Number>;
    aggregate?(condition: any, allowDiskUse: any): Promise<any>;
}

export type DeleteResponse = { ok?: number | undefined, n?: number | undefined };