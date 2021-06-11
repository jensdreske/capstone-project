import mongoose from "mongoose";

const estimateSchema = new mongoose.Schema({
  request: String,
  CarbonInterfaceId: String,
  response: Object,
});

const CarbonInterfaceEstimate = mongoose.model("Estimate", estimateSchema);

export default CarbonInterfaceEstimate;
