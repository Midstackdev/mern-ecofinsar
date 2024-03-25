/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import OverallStatSchema from "../DbSchema/overallStat";
import { BaseModel } from "../libs/database/Model";

/*
 * Use this model class to have acess to common CRUD features
 * Additional you can write custom query methods in this class for the model
 */
export class OverallStatModel extends BaseModel {
  constructor() {
    super(OverallStatSchema);
  }
}

export const OverallStat = new OverallStatModel();
