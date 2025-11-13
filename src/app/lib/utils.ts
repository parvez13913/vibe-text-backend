import jwt, { Secret } from "jsonwebtoken";

export const generateToken = (userId: string, secret: Secret) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  return token;
};
