import driver from "../config/database.js";

import {
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_ID,
} from "../queries/projectQueries.js";

export const getAllProjects = async () => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_PROJECTS);

    return result.records.map((record) => {
      const project = record.get("p").properties;
      const developerCount = record.get("developerCount").toNumber();

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        developerCount,
      };
    });
  } finally {
    await session.close();
  }
};

export const getProjectById = async (id) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_PROJECT_BY_ID, {
      id,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    const project = record.get("p").properties;

    const developers = record
      .get("developers")
      .map((developer) => developer.properties);

    const technologies = record
      .get("technologies")
      .map((technology) => technology.properties);

    return {
      id: project.id,
      name: project.name,
      description: project.description,

      developers: developers.map((developer) => ({
        id: developer.id,
        name: developer.name,
        email: developer.email,
        bio: developer.bio,
      })),

      technologies: technologies.map((technology) => ({
        id: technology.id,
        name: technology.name,
      })),
    };
  } finally {
    await session.close();
  }
};
