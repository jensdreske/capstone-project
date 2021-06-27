import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  co2InKgPerUnit: { type: Number, required: false },
  image: String,
});

const CustomGoal = mongoose.model("CustomGoal", goalSchema);

export default CustomGoal;
