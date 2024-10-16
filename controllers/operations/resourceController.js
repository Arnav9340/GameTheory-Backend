import Resource from "../../models/resource.js";
import mongoose from "mongoose";

/**
 * Resources Controller
 */
const resourcesController = {
	/**
	 * POST /resources
	 * Create a new resource (court).
	 */
	async createResource(req, res) {
		try {
			const { name, sportId, centreId } = req.body;

			// Validate required fields
			if (!name || !sportId || !centreId) {
				return res
					.status(400)
					.json({ error: "Name, sportId, and centreId are required." });
			}

			// Validate ObjectIds
			if (
				!mongoose.Types.ObjectId.isValid(sportId) ||
				!mongoose.Types.ObjectId.isValid(centreId)
			) {
				return res.status(400).json({ error: "Invalid sportId or centreId." });
			}

			// Create new resource
			const newResource = new Resource({
				name,
				sport: sportId,
				centre: centreId,
			});

			await newResource.save();

			return res.status(201).json(newResource);
		} catch (err) {
			console.error("Error in createResource:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /resources
	 * Retrieve a list of resources for a specific sport at a center.
	 * If no parameters are provided, retrieve all resources.
	 */
	async getResources(req, res) {
		try {
			const { centerId, sportId } = req.query;

			let query = {};

			if (centerId) {
				if (!mongoose.Types.ObjectId.isValid(centerId)) {
					return res.status(400).json({ error: "Invalid centerId." });
				}
				query.centre = centerId;
			}

			if (sportId) {
				if (!mongoose.Types.ObjectId.isValid(sportId)) {
					return res.status(400).json({ error: "Invalid sportId." });
				}
				query.sport = sportId;
			}

			const resources = await Resource.find(query).select("name");

			return res.status(200).json(resources);
		} catch (err) {
			console.error("Error in getResources:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * GET /resources/:id
	 * Retrieve details of a specific resource.
	 */
	async getResourceById(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid resource ID." });
			}

			const resource = await Resource.findById(id)
				.populate("sport", "name")
				.populate("centre", "name location");

			if (!resource) {
				return res.status(404).json({ error: "Resource not found." });
			}

			return res.status(200).json(resource);
		} catch (err) {
			console.error("Error in getResourceById:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * PUT /resources/:id
	 * Update a specific resource.
	 */
	async updateResource(req, res) {
		try {
			const { id } = req.params;
			const { name, sportId, centreId } = req.body;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid resource ID." });
			}

			// Validate required fields
			if (!name && !sportId && !centreId) {
				return res.status(400).json({
					error: "At least one of name, sportId, or centreId must be provided.",
				});
			}

			let updateData = {};

			if (name) updateData.name = name;
			if (sportId) {
				if (!mongoose.Types.ObjectId.isValid(sportId)) {
					return res.status(400).json({ error: "Invalid sportId." });
				}
				updateData.sport = sportId;
			}
			if (centreId) {
				if (!mongoose.Types.ObjectId.isValid(centreId)) {
					return res.status(400).json({ error: "Invalid centreId." });
				}
				updateData.centre = centreId;
			}

			// Update resource
			const updatedResource = await Resource.findByIdAndUpdate(id, updateData, {
				new: true,
				runValidators: true,
			});

			if (!updatedResource) {
				return res.status(404).json({ error: "Resource not found." });
			}

			return res.status(200).json(updatedResource);
		} catch (err) {
			console.error("Error in updateResource:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},

	/**
	 * DELETE /resources/:id
	 * Delete a specific resource.
	 */
	async deleteResource(req, res) {
		try {
			const { id } = req.params;

			// Validate ObjectId
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).json({ error: "Invalid resource ID." });
			}

			const deletedResource = await Resource.findByIdAndDelete(id);

			if (!deletedResource) {
				return res.status(404).json({ error: "Resource not found." });
			}

			return res
				.status(200)
				.json({ message: "Resource deleted successfully." });
		} catch (err) {
			console.error("Error in deleteResource:", err);
			return res.status(500).json({ error: "Server error." });
		}
	},
};

export default resourcesController;
