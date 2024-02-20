import express from "express";
import { getAllProjects, getProject } from "../services/projects";
import { checkAuth } from "../middleware/checkAuthentication";

export default (router: express.Router) => {
  router.get("/projects/getProject", checkAuth, getProject);
  router.post("/projects/getAllProjects", checkAuth, getAllProjects);
};
