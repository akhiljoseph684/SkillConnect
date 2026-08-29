import {
  getAllDevelopers,
  getDeveloperById,
  getDeveloperConnections,
} from "../services/developerService.js";

export const getDevelopers = async (req, res) => {
  try {
    const developers = await getAllDevelopers();

    res.status(200).json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error("Error fetching developers:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch developers",
    });
  }
};

export const getDeveloper = async (req, res) => {
  try {
    const { id } = req.params;

    const developer = await getDeveloperById(id);

    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: developer,
    });
  } catch (error) {
    console.error("Error fetching developer:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch developer",
    });
  }
};

export const getConnections = async (req, res) => {
  try {
    const { id } = req.params;

    const connections = await getDeveloperConnections(id);

    res.status(200).json({
      success: true,
      data: connections,
    });
  } catch (error) {
    console.error("Error fetching developer connections:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch developer connections",
    });
  }
};
