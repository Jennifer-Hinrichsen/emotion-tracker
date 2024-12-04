import EmotionEntry from "@/db/models/emotionEntry";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET")
    try {
      const emotionEntry = await EmotionEntry.findById(id).populate("type");

      if (!emotionEntry) {
        return response.status(404).json({ status: "Not Found" });
      }

      response.status(200).json(emotionEntry);
    } catch (error) {
      console.error("Error fetching emotion entry:", error);
      response.status(500).json({ status: "Server Error" });
    }

  if (request.method === "PUT") {
    const emotionData = request.body;
    await EmotionEntry.findByIdAndUpdate(id, emotionData);
    return response.status(200).json({ status: `Emotion ${id} updated!` });
  }
}
