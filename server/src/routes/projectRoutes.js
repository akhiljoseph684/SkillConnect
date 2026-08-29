import express from "express";

import { getProjects, getProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/:id", getProject);

export default router;
