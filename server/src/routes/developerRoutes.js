import express from "express";

import {
  getDevelopers,
  getDeveloper,
  getConnections,
} from "../controllers/developerController.js";

const router = express.Router();


router.get("/", getDevelopers);

router.get("/:id", getDeveloper);

router.get("/:id/connections", getConnections);

export default router;
