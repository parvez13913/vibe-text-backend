import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...signUpdata } = req.body;
  const { result, token } = await AuthService.signUp(signUpdata);
  if (token) {
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: config.node_env === "development" ? false : true,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Create Successfully !!",
    data: {
      result,
      token,
    },
  });
});

export const AuthController = {
  signUp,
};
