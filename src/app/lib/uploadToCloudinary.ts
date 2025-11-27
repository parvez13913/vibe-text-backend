import crypto from "crypto";
import config from "../../config";

export const uploadToCloudinary = async (baseImage: string) => {
  const cloudName = config.cloud_name!;
  const apiKey = config.api_key!;
  const apiSecret = config.api_secret!;

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", baseImage);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.secure_url) {
    console.error("Cloudinary Error:", data);
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
};
