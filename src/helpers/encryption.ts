import crypto from "crypto";

const SECRET = "946EF7F2888F7BBE4512375795D11D";

export const random = () => crypto.randomBytes(128).toString("base64");
export const encrypt = (salt: string, password: string) => {
  return crypto
    .createHmac("md5", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
