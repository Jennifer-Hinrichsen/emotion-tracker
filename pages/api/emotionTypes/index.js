import dbConnect from "../../../db/connect";
import EmotionType from "@/db/models/emotionType";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const emotionTypes = await EmotionType.find();
      response.status(200).json(emotionTypes);
      return;
    }

    if (request.method === "POST") {
      const inputData = request.body;
      console.log("inputData", inputData);

      await EmotionType.create(inputData);
      response.json({ message: "Success!" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
