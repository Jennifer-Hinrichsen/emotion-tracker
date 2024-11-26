import mongoose from "mongoose";
import "./emotionType";
import { Schema } from "mongoose";

const emotionEntriesSchema = new Schema(
  {
    emotionType: { type: Schema.Types.ObjectId, ref: "EmotionType" },
    intensity: { type: Number, required: true },
    notes: { type: String },
    dateTime: { type: String, required: true },
  },
  { collection: "emotion-entries" }
);
const EmotionEntry =
  mongoose.models.EmotionEntry ||
  mongoose.model("EmotionEntry", emotionEntriesSchema);

export default EmotionEntry;
