import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: {
    type: String,
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  centre: {
    type: Schema.Types.ObjectId,
    ref: 'Centre',
    required: true
  }
}, { timestamps: true });
  
export default mongoose.model("Resource", resourceSchema);
  