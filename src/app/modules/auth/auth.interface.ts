import { Model } from "mongoose";

export type ISignUp = {
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
};

export type ISignIn = {
  email: string;
  password: string;
};

export type SignUpModel = Model<ISignUp, Record<string, unknown>>;
