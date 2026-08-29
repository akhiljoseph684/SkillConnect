import { searchGraph } from "../services/searchService.js";

export const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await searchGraph(q.trim());

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error searching graph:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search",
    });
  }
};
