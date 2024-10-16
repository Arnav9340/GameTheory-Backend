// routes/resources.js

import express from "express";
import resourcesController from "../controllers/operations/resourceController.js";
import { authMiddleware, operationsMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /resources - Create a new resource
router.post("/", authMiddleware, operationsMiddleware, resourcesController.createResource);

// GET /resources - Retrieve resources
router.get("/", authMiddleware, operationsMiddleware, resourcesController.getResources);

// GET /resources/:id - Retrieve a specific resource
router.get(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	resourcesController.getResourceById
);

// PUT /resources/:id - Update a specific resource
router.put(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	resourcesController.updateResource
);

// DELETE /resources/:id - Delete a specific resource
router.delete(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	resourcesController.deleteResource
);

export default router;
