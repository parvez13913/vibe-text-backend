import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { ISignUp, SignUpModel } from "./auth.interface";

const signUpSchema = new Schema<ISignUp>(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

signUpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model<ISignUp, SignUpModel>("User", signUpSchema);
