// routes/bookings.js

import express from "express";
import bookingsController from "../controllers/operations/bookingController.js";
import { authMiddleware, operationsMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /bookings - View bookings
router.get("/", authMiddleware, operationsMiddleware, bookingsController.getBookings);

router.get(
	"/available",
	authMiddleware,
	bookingsController.getAvailableTimeSlots
);

// POST /bookings - Create a new booking
router.post(
	"/",
	authMiddleware, bookingsController.createBooking
);

export default router;
