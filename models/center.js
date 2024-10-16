import mongoose from "mongoose";

const Schema = mongoose.Schema;

const centreSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		sports: [
			{
				type: Schema.Types.ObjectId,
				ref: "Sport",
			},
		],
	},
	{ timestamps: true }
);
export default mongoose.model("Center", centreSchema);
