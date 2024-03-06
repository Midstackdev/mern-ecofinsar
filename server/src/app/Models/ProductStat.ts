/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import ProductStatSchema from "../DbSchema/productStat";
import { BaseModel } from "../libs/database/Model";

/*
 * Use this model class to have acess to common CRUD features
 * Additional you can write custom query methods in this class for the model
 */
export class ProductStatModel extends BaseModel {
  constructor() {
    super(ProductStatSchema);
  }
}

export const ProductStat = new ProductStatModel();
