import { StatusCodes } from "http-status-codes";
import ApiError from "../../../shared/apiError";
import { ISignUp } from "./auth.interface";
import { User } from "./auth.module";

const signUp = async (payload: ISignUp): Promise<ISignUp | null> => {
  const isUserExis = await User.findOne({ email: payload?.email });

  if (isUserExis) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  return result;
};

export const AuthService = {
  signUp,
};
