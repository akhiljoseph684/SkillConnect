export const GET_ALL_SKILLS = `
  MATCH (s:Skill)
  OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)

  RETURN s,
         count(DISTINCT d) AS developerCount

  ORDER BY s.name
`;

export const GET_SKILL_BY_ID = `
  MATCH (s:Skill {id: $id})

  OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)

  RETURN s,
         collect(DISTINCT d) AS developers
`;
