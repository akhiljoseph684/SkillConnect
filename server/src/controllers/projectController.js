import { getAllProjects, getProjectById } from "../services/projectService.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};
