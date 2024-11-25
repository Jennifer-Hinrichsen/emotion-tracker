import mongoose from "mongoose";
import { Schema } from "mongoose";
const initialEmotionEntriesSchema = new Schema(
  {
    emotionType: { type: String, required: true },
    intensity: { type: Number, required: true },
    notes: { type: String },
    dateTime: { type: String, required: true },
  },
  { collection: "initial-emotion-entries" }
);
const InitialEmotionEntry =
  mongoose.models.InitialEmotionEntry ||
  mongoose.model("InitialEmotionEntry", initialEmotionEntriesSchema);
export default InitialEmotionEntry;
