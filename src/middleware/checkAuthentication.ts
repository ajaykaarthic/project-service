import express from "express";
import { merge } from "lodash";
import { getUserBySessionToken } from "../database/user";

export const checkAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["PROJECT-SERVICE-AUTH"];
    if (!sessionToken) {
      return res.status(403).json({
        errorMessage: "Invalid Session",
      });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({
        errorMessage: "Invalid Session",
      });
    }
    delete existingUser.saltedPassword;
    delete existingUser.sessionToken;
    delete existingUser.salt;
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
