import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { MessageService } from "./message.service";

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getAllContacts(req?.user?.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Contacts fetched successfully!",
    data: result,
  });
});
const getAllChats = catchAsync(async (req: Request, res: Response) => {
  const loggedInUserId = req?.user?.id;
  const result = await MessageService.getAllChats(loggedInUserId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Chats fetched successfully!",
    data: result,
  });
});

const getMessageByUserId = catchAsync(async (req: Request, res: Response) => {
  const myId = req?.user?._id;
  const { id: userToChatId } = req.params;
  const result = await MessageService.getMessageByUserId(myId, userToChatId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message fetched successfully!",
    data: result,
  });
});
const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { text, image } = req?.body;
  const senderId = req?.user?._id;
  const { id: receiverId } = req?.params;
  let imageUrl;
  if (image) {
    imageUrl = await uploadToCloudinary(image);
  }
  const result = await MessageService.sendMessage({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message created successfully!",
    data: result,
  });
});

export const MessageController = {
  getAllContacts,
  getAllChats,
  getMessageByUserId,
  sendMessage,
};
