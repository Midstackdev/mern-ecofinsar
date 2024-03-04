/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";
import {
  DELIVERY_MODE,
  DELIVERY_MODE_VALUES,
  TWO_FACTOR_TYPE,
  TWO_FACTOR_TYPE_VALUES,
} from "../Enums";

export type IUser = {
  _id?: string;
  name: string;
  password: string;
  email: string;
  emailVerifiedAt: Date;
  refreshToken?: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: [];
  settings: {
    twoFactor: {
      enabled: boolean;
      type: string;
      delivery: string;
      secret: string;
    };
  };
};

export type UserDoc = IUser & Document;

const Settings = new Schema({
  twoFactor: new Schema({
    enabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: TWO_FACTOR_TYPE_VALUES,
      default: TWO_FACTOR_TYPE.APP,
    },
    delivery: {
      type: String,
      enum: DELIVERY_MODE_VALUES,
      default: DELIVERY_MODE.EMAIL,
    },
    secret: {
      type: String,
      default: "",
    },
  }),
});

const NestedSchema = new Schema({
  username: { type: String },
});

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    emailVerifiedAt: { type: Date },
    refreshToken: { type: String },
    details: NestedSchema,
    settings: Settings,
    city: { type: String },
    state: { type: String },
    country: { type: String },
    occupation: { type: String },
    phoneNumber: { type: String },
    transactions: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model<UserDoc>("User", UserSchema);
