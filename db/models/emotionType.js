import mongoose from "mongoose";
import { Schema } from "mongoose";

const emotionTypeSchema = new Schema(
  {
    emotionType: { type: String, required: true },
    color: { type: String, required: true },
    emotionIconId: { type: String, required: true },
  },
  { collection: "emotion-types" }
);
const EmotionType =
  mongoose.models.EmotionType ||
  mongoose.model("EmotionType", emotionTypeSchema);

export default EmotionType;
