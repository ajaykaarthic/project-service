import {
  getProjectById,
  getRecentProjects,
  getProjectsByCategory,
  getProjectsSortedByName,
  getProjectsByCategoryAndSorted,
} from "../database/projects";
import express from "express";

export const getProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pid } = req.body;
    if (!pid) {
      return res.status(400).json({
        errorMessage: "Invalid project id",
      });
    }
    const project = await getProjectById(parseInt(pid, 10));
    if (project != null) {
      return res.status(200).json(project).end();
    } else {
      return res.status(404).json({
        errorMessage: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Internal System Error",
      systemError: error,
    });
  }
};

export const getAllProjects = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { offset, pageSize, projectCategory, isSortRequired, isDescending } =
      req.body;

    let projects: any;

    // Basic request validation
    if (!offset || !pageSize) {
      return res.status(400).json({
        errorMessage: "Invalid request",
      });
    }
    if (!projectCategory) {
      if (!isSortRequired) {
        projects = await getRecentProjects(
          parseInt(offset, 10),
          parseInt(pageSize, 10)
        );
      } else {
        projects = await getProjectsSortedByName(
          parseInt(offset, 10),
          parseInt(pageSize, 10),
          isDescending
        );
      }
    } else if (!isSortRequired) {
      projects = await getProjectsByCategory(
        parseInt(offset, 10),
        parseInt(pageSize, 10),
        projectCategory
      );
    } else {
      projects = await getProjectsByCategoryAndSorted(
        parseInt(offset, 10),
        parseInt(pageSize, 10),
        projectCategory,
        isDescending
      );
    }
    return res.status(200).json(projects).end();
  } catch (error) {
    return error;
  }
};
