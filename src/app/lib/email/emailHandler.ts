import { StatusCodes } from "http-status-codes";
import ApiError from "../../../shared/apiError";
import { WelcomeEmailTemplate } from "./emailTemplate";
import { resendClient, sender } from "./resend";

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  clientUrl: string
) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to VibeText",
    html: WelcomeEmailTemplate(name, clientUrl),
  });
  console.log("data:", data);
  console.log("error:", error);

  if (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Fail to send welcome email");
  }
};
