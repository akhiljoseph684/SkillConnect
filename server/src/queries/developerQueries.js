export const GET_ALL_DEVELOPERS = `
  MATCH (d:Developer)
  RETURN d
  ORDER BY d.name
`;

export const GET_DEVELOPER_BY_ID = `
  MATCH (d:Developer {id: $id})

  OPTIONAL MATCH (d)-[:HAS_SKILL]->(skill:Skill)

  OPTIONAL MATCH (d)-[:WORKED_ON]->(project:Project)

  RETURN d,
         collect(DISTINCT skill) AS skills,
         collect(DISTINCT project) AS projects
`;

export const GET_DEVELOPER_CONNECTIONS = `
  MATCH (d:Developer {id: $id})
        -[:WORKED_ON]->(project:Project)
        <-[:WORKED_ON]-(other:Developer)

  WHERE d.id <> other.id

  OPTIONAL MATCH (other)-[:HAS_SKILL]->(skill:Skill)

  RETURN other,
         collect(DISTINCT skill) AS skills,
         collect(DISTINCT project) AS sharedProjects

  ORDER BY other.name
`;
