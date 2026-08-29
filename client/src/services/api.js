const API_URL = "http://localhost:5000/api";

const request = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
};

export const getDevelopers = () => {
  return request("/developers");
};

export const getDeveloper = (id) => {
  return request(`/developers/${id}`);
};

export const getDeveloperConnections = (id) => {
  return request(`/developers/${id}/connections`);
};

export const getSkills = () => {
  return request("/skills");
};

export const getSkill = (id) => {
  return request(`/skills/${id}`);
};

export const getProjects = () => {
  return request("/projects");
};

export const getProject = (id) => {
  return request(`/projects/${id}`);
};

export const searchGraph = (query) => {
  return request(`/search?q=${encodeURIComponent(query)}`);
};
