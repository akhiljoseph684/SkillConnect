import express from "express";

import { getSkills, getSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);

router.get("/:id", getSkill);

export default router;
