import mongoose from "mongoose";
import { Schema } from "mongoose";
const initialEmotionEntriesSchema = new Schema({
  emotionType: { type: String, required: true },
  intensity: { type: Number, required: true },
  notes: { type: String },
  dateTime: { type: String, required: true },
});
const initialEmotionEntries =
  mongoose.models.initialEmotionEntries ||
  mongoose.model("initialEmotionEntries", initialEmotionEntriesSchema);
export default initialEmotionEntries;
