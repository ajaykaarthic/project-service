import express from "express";
import projects from "./projects";
import userAuthentication from "./userAuthentication";

// Creating an instance of Express router
const router = express.Router();

// Attaching required routes
export default (): express.Router => {
  userAuthentication(router);
  projects(router);
  return router;
};
