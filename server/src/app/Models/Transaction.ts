/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import TransactionSchema from "../DbSchema/transaction";
import { BaseModel } from "../libs/database/Model";

/*
 * Use this model class to have acess to common CRUD features
 * Additional you can write custom query methods in this class for the model
 */
export class TransactionModel extends BaseModel {
  constructor() {
    super(TransactionSchema);
  }

  getTransactions({ where, sort, skip, limit }: Record<string, any>) {
    return TransactionSchema.find({ ...where })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }
}

export const Transaction = new TransactionModel();
