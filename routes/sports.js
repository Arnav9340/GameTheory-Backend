import express from "express";
import sportsController from "../controllers/operations/sportsController.js";
import {
	authMiddleware,
	operationsMiddleware,
} from "../middlewares/authMiddleware.js";


const router = express.Router();

// POST /sports - Create a new sport
router.post(
	"/",
	authMiddleware,
	operationsMiddleware,
	sportsController.createSport
);

// GET /sports - Retrieve sports
router.get(
	"/",
	authMiddleware,
	operationsMiddleware,
	sportsController.getSports
);

// GET /sports/:id - Retrieve a specific sport
router.get(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	sportsController.getSportById
);

// PUT /sports/:id - Update a specific sport
router.put(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	sportsController.updateSport
);

// DELETE /sports/:id - Delete a specific sport
router.delete(
	"/:id",
	authMiddleware,
	operationsMiddleware,
	sportsController.deleteSport
);

export default router;
