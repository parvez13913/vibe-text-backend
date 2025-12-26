import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { sendWelcomeEmail } from "../../lib/email/emailHandler";
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

  if (!!result?._id) {
    await sendWelcomeEmail(
      config.email_from || "",
      config.email_from_name || "",
      config.client_url || ""
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Create Successfully !!",
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const { ...signIndata } = req.body;
  const { token } = await AuthService.signIn(signIndata);

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
    message: "Sign in Successfully !!",
    data: {
      token: token,
    },
  });
});

const signOut = catchAsync(async (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 0 });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sign out Successfully !!",
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const payload = req.body;
  const result = await AuthService.updateProfile(userId, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Profile updated Successfully !!",
    data: result,
  });
});

const check = catchAsync(async (req: Request, res: Response) => {
  const result = req.user;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Active!!",
    data: result,
  });
});

export const AuthController = {
  signUp,
  signIn,
  signOut,
  updateProfile,
  check,
};
