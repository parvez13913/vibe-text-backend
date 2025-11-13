import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ISignUp } from "./auth.interface";
import { AuthService } from "./auth.service";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...signUpdata } = req.body;
  const result = await AuthService.signUp(signUpdata);

  sendResponse<ISignUp>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Create Successfully !!",
    data: result,
  });
});

export const AuthController = {
  signUp,
};
