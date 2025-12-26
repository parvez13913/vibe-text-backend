import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import ApiError from "../../../shared/apiError";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { generateToken } from "../../lib/utils";
import { ISignIn, ISignUp, TProfileUpdate } from "./auth.interface";
import { User } from "./auth.model";

const signUp = async (payload: ISignUp) => {
  const isUserExis = await User.findOne({ email: payload?.email });

  if (isUserExis) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  let token = null;
  if (result) {
    const secret = config.jwtSecret as string;
    token = generateToken(result?._id?.toString(), secret);
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
    isUserExis?.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  let token = null;
  const secret = config.jwtSecret as string;
  token = generateToken(isUserExis._id.toString(), secret);

  return { user: isUserExis, token };
};

const updateProfile = async (userId: string, payload: TProfileUpdate) => {
  if (!userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }

  const updateData: Partial<TProfileUpdate> = {};

  if (payload.profilePic) {
    const imageUrl = await uploadToCloudinary(payload.profilePic);
    updateData.profilePic = imageUrl;
  }

  if (payload.fullName) updateData.fullName = payload.fullName;
  if (payload.password) updateData.password = payload.password;

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

export const AuthService = {
  signUp,
  signIn,
  updateProfile,
};
