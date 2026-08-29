import driver from "../config/database.js";

import { GET_ALL_SKILLS, GET_SKILL_BY_ID } from "../queries/skillQueries.js";

export const getAllSkills = async () => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_SKILLS);

    return result.records.map((record) => {
      const skill = record.get("s").properties;
      const developerCount = record.get("developerCount").toNumber();

      return {
        id: skill.id,
        name: skill.name,
        developerCount,
      };
    });
  } finally {
    await session.close();
  }
};

export const getSkillById = async (id) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_SKILL_BY_ID, {
      id,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    const skill = record.get("s").properties;

    const developers = record
      .get("developers")
      .map((developer) => developer.properties);

    return {
      id: skill.id,
      name: skill.name,
      developers: developers.map((developer) => ({
        id: developer.id,
        name: developer.name,
        email: developer.email,
        bio: developer.bio,
      })),
    };
  } finally {
    await session.close();
  }
};
