export const SEARCH_GRAPH = `
  CALL {
    MATCH (d:Developer)
    WHERE toLower(d.name) CONTAINS toLower($search)
       OR toLower(d.bio) CONTAINS toLower($search)
    RETURN
      d.id AS id,
      d.name AS name,
      "developer" AS type,
      d.bio AS description

    UNION

    MATCH (s:Skill)
    WHERE toLower(s.name) CONTAINS toLower($search)
    RETURN
      s.id AS id,
      s.name AS name,
      "skill" AS type,
      null AS description

    UNION

    MATCH (p:Project)
    WHERE toLower(p.name) CONTAINS toLower($search)
       OR toLower(p.description) CONTAINS toLower($search)
    RETURN
      p.id AS id,
      p.name AS name,
      "project" AS type,
      p.description AS description
  }

  RETURN id, name, type, description
  ORDER BY name
`;
