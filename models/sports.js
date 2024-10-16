import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  centres: [{
    type: Schema.Types.ObjectId,
    ref: 'Centre'
  }],
  resourceName : {
    type: String,
    required: true
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }]
}, { timestamps: true });
  
export default mongoose.model("Sport", sportSchema);
  