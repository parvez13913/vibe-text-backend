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
  email_from: process.env.EMAIL_FROM,
  app_password: process.env.APP_PASSWORD,
  email_from_name: process.env.EMAIL_FROM_NAME,
  client_url: process.env.CLIENT_URL,
};
