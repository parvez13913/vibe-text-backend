import { Model, Types } from "mongoose";
import { ISignUp } from "../auth/auth.interface";

export type IMessage = {
  _id: any;
  senderId: Types.ObjectId | ISignUp;
  receiverId: Types.ObjectId | ISignUp;
  text?: string;
  image?: string;
};

export type MessageModel = Model<IMessage, Record<string, unknown>>;
