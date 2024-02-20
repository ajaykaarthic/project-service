import { db } from "../utils/db_server";

export const getProjectById = async (pid: number) => {
  const project = await db.projects.findUnique({
    where: {
      pid,
    },
  });
  return project;
};

export const getRecentProjects = async (offset: number, pageSize: number) => {
  const totalCount = await db.projects.count();
  const totalPages = Math.ceil(totalCount / pageSize);
  const projects = await db.projects.findMany({
    orderBy: {
      pid: "desc",
    },
    skip: (offset - 1) * pageSize,
    take: pageSize,
  });
  return { projects, totalPages, currentPage: offset };
};

export const getProjectsSortedByName = async (
  offset: number,
  pageSize: number,
  isDescending: boolean
) => {
  const totalCount = await db.projects.count();
  const totalPages = Math.ceil(totalCount / pageSize);
  const projects = await db.projects.findMany({
    orderBy: {
      projectName: isDescending ? "desc" : "asc",
    },
    skip: (offset - 1) * pageSize,
    take: pageSize,
  });
  return { projects, totalPages, currentPage: offset };
};

export const getProjectsByCategory = async (
  offset: number,
  pageSize: number,
  category: string
) => {
  const totalCount = await db.projects.count({
    where: {
      projectCategory: category,
    },
  });
  const totalPages = Math.ceil(totalCount / pageSize);
  const projects = await db.projects.findMany({
    where: {
      projectCategory: category,
    },
    skip: (offset - 1) * pageSize,
    take: pageSize,
  });
  return { projects, totalPages, currentPage: offset };
};

export const getProjectsByCategoryAndSorted = async (
  offset: number,
  pageSize: number,
  category: string,
  isDescending: boolean
) => {
  const totalCount = await db.projects.count({
    where: {
      projectCategory: category,
    },
  });
  const totalPages = Math.ceil(totalCount / pageSize);
  const projects = await db.projects.findMany({
    where: {
      projectCategory: category,
    },
    orderBy: {
      projectName: isDescending ? "desc" : "asc",
    },
    skip: (offset - 1) * pageSize,
    take: pageSize,
  });
  return { projects, totalPages, currentPage: offset };
};
