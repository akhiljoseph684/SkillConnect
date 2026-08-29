export const GET_ALL_PROJECTS = `
  MATCH (p:Project)
  OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)

  RETURN p,
         count(DISTINCT d) AS developerCount

  ORDER BY p.name
`;

export const GET_PROJECT_BY_ID = `
  MATCH (p:Project {id: $id})

  OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)

  OPTIONAL MATCH (p)-[:USES]->(technology:Technology)

  RETURN p,
         collect(DISTINCT d) AS developers,
         collect(DISTINCT technology) AS technologies
`;
