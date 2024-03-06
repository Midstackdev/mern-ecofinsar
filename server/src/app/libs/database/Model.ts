import mongoose from "mongoose";
import { IPopulate } from "../../interfaces";

/**
 * Provides common CRUD functionality to provided mongoose moodel.
 */
export class BaseModel {
  public returnNew = { useFindAndModify: false, new: true };

  constructor(public mongooseModel: mongoose.Model<any>) {}

  create<T>(document: any): Promise<T> {
    return this.mongooseModel.create(document);
  }

  insertMany<T>(documents: any[]): Promise<T[]> {
    return this.mongooseModel.insertMany(documents);
  }

  aggregate<T>(aggregations: any[]): Promise<T[]> {
    return this.mongooseModel.aggregate(aggregations);
  }

  find<T>(populate?: IPopulate): Promise<T[]> {
    return populate
      ? this.mongooseModel.find().populate(populate).exec()
      : this.mongooseModel.find().exec();
  }

  findById<T>(id: string, populate?: IPopulate): Promise<T> {
    return populate
      ? this.mongooseModel.findById(id).populate(populate).exec()
      : this.mongooseModel.findById(id).exec();
  }

  findOne<T>(query: any, populate?: IPopulate): Promise<T> {
    return populate
      ? this.mongooseModel.findOne(query).populate(populate).exec()
      : this.mongooseModel.findOne(query).exec();
  }

  findMany<T>(
    query: any,
    select?: string,
    populate?: IPopulate
  ): Promise<any[] | T> {
    return populate
      ? this.mongooseModel
          .find(query)
          .populate(populate)
          .select(`${select}`)
          .exec()
      : this.mongooseModel.find(query).select(`${select}`).exec();
  }

  updateById<T>(id: string, document: any, populate?: IPopulate): Promise<T> {
    return populate
      ? this.mongooseModel
          .findByIdAndUpdate(id, document, this.returnNew)
          .populate(populate)
          .exec()
      : this.mongooseModel
          .findByIdAndUpdate(id, document, this.returnNew)
          .exec();
  }

  deleteById<T>(id: string): Promise<T> {
    return this.mongooseModel.findByIdAndDelete(id).exec();
  }
}
