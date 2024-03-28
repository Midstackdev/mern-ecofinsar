/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import AffiliateStatSchema from "../DbSchema/affiliateStat";
import { BaseModel } from "../libs/database/Model";

/*
 * Use this model class to have acess to common CRUD features
 * Additional you can write custom query methods in this class for the model
 */
export class AffiliateStatModel extends BaseModel {
  constructor() {
    super(AffiliateStatSchema);
  }
}

export const AffiliateStat = new AffiliateStatModel();
