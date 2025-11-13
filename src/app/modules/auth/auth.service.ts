import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import ApiError from "../../../shared/apiError";
import { generateToken } from "../../lib/utils";
import { ISignUp } from "./auth.interface";
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

export const AuthService = {
  signUp,
};
