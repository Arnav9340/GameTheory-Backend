import Centre from "../../models/center.js";
import mongoose from "mongoose";

/**
 * Centers Controller
 */
const centersController = {
	/**
	 * POST /centers
	 * Create a new center.
	 */
	async createCenter(req, res) {
		try {
			const { name, location, sports } = req.body;

			// Validate required fields
			if (!name || !location) {
				return res
					.status(400)
					.json({ error: "Name and location are required." });
			}

			// Create new center
			const newCenter = new Centre({
				name,
				location,
				sports: sports || [],
			});

			await newCenter.save();

			return res.status(201).json(newCenter);
		} catch (err) {
			console.error("Error in createCenter:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /centers
	 * Retrieve a list of all centers.
	 */
	async getCenters(req, res) {
		try {
			const centers = await Centre.find().select("name location");

			return res.status(200).json(centers);
		} catch (err) {
			console.error("Error in getCenters:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /centers/:id
	 * Retrieve details of a specific center.
	 */
	async getCenterById(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid center ID." });
			}

			const center = await Centre.findById(id).populate("sports", "name");

			if (!center) {
				return res.status(404).json({ error: "Center not found." });
			}

			return res.status(200).json(center);
		} catch (err) {
			console.error("Error in getCenterById:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * PUT /centers/:id
	 * Update a specific center.
	 */
	async updateCenter(req, res) {
		try {
			const { id } = req.params;
			const { name, location, sports } = req.body;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid center ID." });
			}

			// Validate required fields
			if (!name && !location && !sports) {
				return res.status(400).json({
					error: "At least one of name, location, or sports must be provided.",
				});
			}

			// Update center
			const updatedCenter = await Centre.findByIdAndUpdate(
				id,
				{ name, location, sports },
				{ new: true, runValidators: true }
			);

			if (!updatedCenter) {
				return res.status(404).json({ error: "Center not found." });
			}

			return res.status(200).json(updatedCenter);
		} catch (err) {
			console.error("Error in updateCenter:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * DELETE /centers/:id
	 * Delete a specific center.
	 */
	async deleteCenter(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid center ID." });
			}

			const deletedCenter = await Centre.findByIdAndDelete(id);

			if (!deletedCenter) {
				return res.status(404).json({ error: "Center not found." });
			}

			return res.status(200).json({ message: "Center deleted successfully." });
		} catch (err) {
			console.error("Error in deleteCenter:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},
};

export default centersController;
