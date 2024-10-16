import Sport from "../../models/sports.js";
import Centre from "../../models/center.js";
import mongoose from "mongoose";

/**
 * Sports Controller
 */
const sportsController = {
	/**
	 * POST /sports
	 * Create a new sport.
	 */
	async createSport(req, res) {
		try {
			const { name, resourceName, centres } = req.body;

			// Validate required fields
			if (!name || !resourceName) {
				return res
					.status(400)
					.json({ error: "Name and resourceName are required." });
			}

			// Create new sport
			const newSport = new Sport({
				name,
				resourceName,
				centres: centres || [],
			});

			await newSport.save();

			return res.status(201).json(newSport);
		} catch (err) {
			console.error("Error in createSport:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /sports
	 * Retrieve a list of sports offered at a specific center.
	 * If no centerId is provided, retrieve all sports.
	 */
	async getSports(req, res) {
		try {
			const { centerId } = req.query;

			if (centerId) {
				// Validate ObjectId
				if (!mongoose.Types.ObjectId.isValid(centerId)) {
					return res.status(400).json({ error: "Invalid centerId." });
				}

				// Find the center
				const center = await Centre.findById(centerId).populate(
					"sports",
					"name"
				);

				if (!center) {
					return res.status(404).json({ error: "Center not found." });
				}

				// Return the sports offered at the center
				const sports = center.sports;

				return res.status(200).json(sports);
			} else {
				// If no centerId, return all sports
				const sports = await Sport.find().select("name resourceName");
				return res.status(200).json(sports);
			}
		} catch (err) {
			console.error("Error in getSports:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /sports/:id
	 * Retrieve details of a specific sport.
	 */
	async getSportById(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid sport ID." });
			}

			const sport = await Sport.findById(id).populate(
				"centres",
				"name location"
			);

			if (!sport) {
				return res.status(404).json({ error: "Sport not found." });
			}

			return res.status(200).json(sport);
		} catch (err) {
			console.error("Error in getSportById:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * PUT /sports/:id
	 * Update a specific sport.
	 */
	async updateSport(req, res) {
		try {
			const { id } = req.params;
			const { name, resourceName, centres } = req.body;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid sport ID." });
			}

			// Validate required fields
			if (!name && !resourceName && !centres) {
				return res.status(400).json({
					error:
						"At least one of name, resourceName, or centres must be provided.",
				});
			}

			// Update sport
			const updatedSport = await Sport.findByIdAndUpdate(
				id,
				{ name, resourceName, centres },
				{ new: true, runValidators: true }
			);

			if (!updatedSport) {
				return res.status(404).json({ error: "Sport not found." });
			}

			return res.status(200).json(updatedSport);
		} catch (err) {
			console.error("Error in updateSport:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * DELETE /sports/:id
	 * Delete a specific sport.
	 */
	async deleteSport(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid sport ID." });
			}

			const deletedSport = await Sport.findByIdAndDelete(id);

			if (!deletedSport) {
				return res.status(404).json({ error: "Sport not found." });
			}

			return res.status(200).json({ message: "Sport deleted successfully." });
		} catch (err) {
			console.error("Error in deleteSport:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},
};

export default sportsController;
