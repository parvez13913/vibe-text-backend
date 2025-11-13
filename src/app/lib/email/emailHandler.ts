import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import config from "../../../config";
import ApiError from "../../../shared/apiError";
import { WelcomeEmailTemplate } from "./welcomeEmail";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email_from,
    pass: config.app_password,
  },
});

export const sender = {
  email: config.email_from,
  name: config.email_from_name,
};

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  clientUrl: string
) => {
  const emailContent = WelcomeEmailTemplate(name, clientUrl);

  // Define the email options
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to VibeText",
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to send welcome email");
  }
};
