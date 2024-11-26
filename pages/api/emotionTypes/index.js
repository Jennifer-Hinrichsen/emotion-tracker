import dbConnect from "../../../db/connect";
import EmotionEntry from "@/db/models/emotionEntry";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const emotionEntries = await EmotionType.find();
      response.status(200).json(emotionEntries);
      return;
    }

    if (request.method === "POST") {
      const inputData = request.body;

      await EmotionEntry.create(inputData);
      response.json({ message: "Success!" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
