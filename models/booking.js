import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		resource: {
			type: Schema.Types.ObjectId,
			ref: "Resource",
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		startTime: {
			type: Number,
			required: true,
			min: 4,
			max: 22,
		},
		endTime: {
			type: Number,
			required: true,
			min: 4,
			max: 22,
			validate: {
				validator: function (value) {
					return value > this.startTime;
				},
				message: "endTime must be greater than startTime",
			},
		},
		centre: {
			type: Schema.Types.ObjectId,
			ref: "Centre",
			required: true,
		},
		sport: {
			type: Schema.Types.ObjectId,
			ref: "Sport",
			required: true,
		},
		type: {
			type: String,
			enum: [
				"Booking",
				"Checked-in",
				"Coaching",
				"Blocked / Tournament",
				"Completed",
				"Pending Payment",
			],
			default: "Booking",
			required: true,
		},
		note: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
