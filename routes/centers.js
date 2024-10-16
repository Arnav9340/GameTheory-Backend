// routes/centers.js

import express from "express";
import centersController from "../controllers/operations/centerController.js";
import { authMiddleware, operationsMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /centers - Create a new center
router.post("/", authMiddleware, operationsMiddleware, centersController.createCenter);

// GET /centers - Retrieve all centers
router.get(
	"/",
	authMiddleware,
	operationsMiddleware,
	centersController.getCenters
);

// GET /centers/:id - Retrieve a specific center
router.get(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	centersController.getCenterById
);

// PUT /centers/:id - Update a specific center
router.put(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	centersController.updateCenter
);

// DELETE /centers/:id - Delete a specific center
router.delete(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	centersController.deleteCenter
);

export default router;
