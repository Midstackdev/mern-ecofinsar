/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import ProductSchema from "../DbSchema/product";
import { BaseModel } from "../libs/database/Model";

/*
 * Use this model class to have acess to common CRUD features
 * Additional you can write custom query methods in this class for the model
 */
export class ProductModel extends BaseModel {
  constructor() {
    super(ProductSchema);
  }
}

export const Product = new ProductModel();
