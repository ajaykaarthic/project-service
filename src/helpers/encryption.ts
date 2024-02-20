import crypto from "crypto";

const SECRET = "4C7A85ECA0B3F2D8E6A1745D06F31A";

// Creating a 128 bytes, random base64 encoded string
export const random = () => crypto.randomBytes(128).toString("base64");

// Creating a MD5 hash for salt + password
export const encrypt = (salt: string, password: string) => {
  return crypto
    .createHmac("md5", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
