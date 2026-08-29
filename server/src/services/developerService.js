import driver from "../config/database.js";

import {
  GET_ALL_DEVELOPERS,
  GET_DEVELOPER_BY_ID,
  GET_DEVELOPER_CONNECTIONS,
} from "../queries/developerQueries.js";

export const getAllDevelopers = async () => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_DEVELOPERS);

    return result.records.map((record) => {
      const developer = record.get("d").properties;

      return {
        id: developer.id,
        name: developer.name,
        email: developer.email,
        bio: developer.bio,
      };
    });
  } finally {
    await session.close();
  }
};

export const getDeveloperById = async (id) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_DEVELOPER_BY_ID, {
      id,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    const developer = record.get("d").properties;

    const skills = record.get("skills").map((skill) => skill.properties);

    const projects = record
      .get("projects")
      .map((project) => project.properties);

    return {
      id: developer.id,
      name: developer.name,
      email: developer.email,
      bio: developer.bio,
      skills,
      projects,
    };
  } finally {
    await session.close();
  }
};

export const getDeveloperConnections = async (id) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_DEVELOPER_CONNECTIONS, {
      id,
    });

    return result.records.map((record) => {
      const developer = record.get("other").properties;

      const skills = record.get("skills").map((skill) => skill.properties);

      const sharedProjects = record
        .get("sharedProjects")
        .map((project) => project.properties);

      return {
        id: developer.id,
        name: developer.name,
        email: developer.email,
        bio: developer.bio,
        skills,
        sharedProjects,
      };
    });
  } finally {
    await session.close();
  }
};
