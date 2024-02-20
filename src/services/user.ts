import express from "express";
import { loginUser, newUser } from "../helpers/validation";
import {
  createUser,
  getUserByEmail,
  updateUserSession,
} from "../database/user";
import { encrypt, random } from "../helpers/encryption";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const validUser = newUser(req.body);
    if (validUser.error) {
      return res.status(400).json({ errorMessage: "Invalid user data" });
    }
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ errorMessage: "Duplicate user" });
    }
    const salt = random();
    const user = await createUser({
      email: validUser.value.email,
      saltedPassword: encrypt(salt, validUser.value.password),
      address: validUser.value.address,
      firstName: validUser.value.firstName,
      lastName: validUser.value.lastName,
      phoneNumber: validUser.value.phoneNumber,
      sessionToken: "",
      salt: salt,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    return error;
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const validUser = loginUser(req.body);

    if (validUser.error) {
      return res.status(400).json({ errorMessage: "Invalid login data" });
    }

    const user = await getUserByEmail(validUser.value.email);

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    const expectedHash = encrypt(user.salt, validUser.value.password);

    if (user.saltedPassword != expectedHash) {
      return res.status(403).json({ errorMessage: "Wrong password" });
    }

    const salt = random();
    user.sessionToken = encrypt(salt, user.email);

    const updatedUser = await updateUserSession(user);

    res.cookie("PROJECT-SERVICE-AUTH", user.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    return error;
  }
};
