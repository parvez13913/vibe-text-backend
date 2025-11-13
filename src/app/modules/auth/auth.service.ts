import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import ApiError from "../../../shared/apiError";
import { generateToken } from "../../lib/utils";
import { ISignIn, ISignUp } from "./auth.interface";
import { User } from "./auth.module";

const signUp = async (payload: ISignUp) => {
  const isUserExis = await User.findOne({ email: payload?.email });

  if (isUserExis) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);
  let token = null;
  if (result) {
    const secret = config.jwtSecret as string;
    token = generateToken(result._id.toString(), secret);
  }

  return { result, token };
};

const signIn = async (payload: ISignIn) => {
  const isUserExis = await User.findOne({ email: payload?.email });

  if (!isUserExis) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User dosen't exists");
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    isUserExis.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  let token = null;
  const secret = config.jwtSecret as string;
  token = generateToken(isUserExis._id.toString(), secret);

  return { user: isUserExis, token };
};

export const AuthService = {
  signUp,
  signIn,
};
