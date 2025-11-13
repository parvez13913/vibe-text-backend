import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  node_env: process.env.NODE_ENV,
  resend_api_key: process.env.RESEND_API_KEY,
  email_from: process.env.EMAIL_FROM,
  email_from_name: process.env.EMAIL_FROM_NAME,
  client_url: process.env.CLIENT_URL,
};
