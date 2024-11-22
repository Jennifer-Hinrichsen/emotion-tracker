import mongoose from "mongoose";
import { Schema } from "mongoose";
const initialEmotionEntriesSchema = new Schema({
  emotionType: { type: String, required: true },
  intensity: { type: Number, required: true },
  notes: { type: String },
  dateTime: { type: String, required: true },
});
const initialEmotionEntry =
  mongoose.models.initialEmotionEntry ||
  mongoose.model("initialEmotionEntry", initialEmotionEntriesSchema);
export default initialEmotionEntry;
