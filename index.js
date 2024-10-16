import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/users.js";
import centersRoutes from "./routes/centers.js";
import sportsRoutes from "./routes/sports.js";
import resourcesRoutes from "./routes/resources.js";
import bookingsRoutes from "./routes/bookings.js";
import cors from "cors"; 
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("Error connecting to MongoDB:", err));

	app.use("/api/auth", authRoutes);
	app.use("/api/centers", centersRoutes);
	app.use("/api/sports", sportsRoutes);
	app.use("/api/resources", resourcesRoutes);
	app.use("/api/bookings", bookingsRoutes);

app.get("/", async (req, res) => {
	res.send("hello");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message || "Internal Server Error",
		error: process.env.NODE_ENV === "production" ? {} : err,
	});
});

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
