import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../app/models/auth/auth.model";
import config from "../config";
import ApiError from "../shared/apiError";

interface JwtUserPayload extends jwt.JwtPayload {
  userId: string;
}

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized- No token provide"
      );
    }
    const decodedToken = (await jwt.verify(
      token,
      config.jwtSecret!
    )) as JwtUserPayload;

    if (!decodedToken) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized - Invalid token"
      );
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {}
};
