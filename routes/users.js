import express from "express";
import { registerUser, loginUser } from "../controllers/user/authController.js";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";
import promoteUser from "../controllers/admin/promoteCustomer.js";
const router = express.Router();

// Register User Route
router.post("/register", registerUser);

// Login User Route
router.post("/login", loginUser);

router.patch("/promote", authMiddleware, adminMiddleware, promoteUser);

export default router;
