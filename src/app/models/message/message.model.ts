import { model, Schema, Types } from "mongoose";
import { IMessage, MessageModel } from "./message.interface";

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage, MessageModel>("Message", messageSchema);
