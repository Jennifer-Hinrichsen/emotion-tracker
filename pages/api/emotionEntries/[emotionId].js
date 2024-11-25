import EmotionEntry from "@/db/models/emotionEntry";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { emotionId } = request.query;

  if (request.method === "GET") {
    const emotionEntry = await EmotionEntry.findById(emotionId);

    if (!EmotionEntry) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(emotionEntry);
  }
}
