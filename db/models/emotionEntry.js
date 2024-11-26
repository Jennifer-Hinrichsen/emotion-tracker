import mongoose from "mongoose";
import { Schema } from "mongoose";

const emotionEntriesSchema = new Schema(
  {
    emotionType: { type: String, required: true },
    intensity: { type: Number, required: true },
    notes: { type: String },
    dateTime: { type: String, required: true },
  },
  { collection: "moodwave-database" }
);
const EmotionEntry =
  mongoose.models.EmotionEntry ||
  mongoose.model("EmotionEntry", emotionEntriesSchema);

export default EmotionEntry;
