import driver from "../config/database.js";

import { SEARCH_GRAPH } from "../queries/searchQueries.js";

export const searchGraph = async (search) => {
  const session = driver.session();

  try {
    const result = await session.run(SEARCH_GRAPH, {
      search,
    });

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      type: record.get("type"),
      description: record.get("description"),
    }));
  } finally {
    await session.close();
  }
};
