import express from "express";
import projects from "./projects";
import userAuthentication from "./userAuthentication";

const router = express.Router();

export default (): express.Router => {
  userAuthentication(router);
  projects(router);
  return router;
};
