import { User } from "../auth/auth.model";
import { Message } from "./message.model";

const getAllContacts = async (userId: string) => {
  const result = await User.find({ _id: { $ne: userId } }).select("-password");
  return result;
};
const getAllChats = async (userId: string) => {
  const message = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });

  const chatPartnerIds = [
    ...new Set(
      message?.map((msg) =>
        msg?.senderId.toString() === userId.toString()
          ? msg?.receiverId.toString()
          : msg?.senderId.toString()
      )
    ),
  ];

  const chatPartner = await User.find({ _id: { $in: chatPartnerIds } }).select(
    "-password"
  );

  return chatPartner;
};

const getMessageByUserId = async (myId: string, userToChatId: string) => {
  const result = await Message.find({
    $or: [
      {
        senderId: myId,
        receiverId: userToChatId,
      },
      {
        senderId: userToChatId,
        receiverId: myId,
      },
    ],
  });

  return result;
};

const sendMessage = async ({
  senderId,
  receiverId,
  text,
  image,
}: {
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
}) => {
  const result = await Message.create({
    senderId,
    receiverId,
    text,
    image,
  });

  return result;
};

export const MessageService = {
  getAllContacts,
  getMessageByUserId,
  sendMessage,
  getAllChats,
};
