import { getAllSkills, getSkillById } from "../services/skillService.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await getAllSkills();

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};

export const getSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await getSkillById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    console.error("Error fetching skill:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
    });
  }
};
