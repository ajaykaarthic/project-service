import express from "express";
import { register, login } from "../services/user";

export default (router: express.Router) => {
  router.post("/user/register", register);
  router.post("/user/login", login);
};
