import dbConnect from "@/db/connect";
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

      const createdType = await EmotionType.create(inputData);
      response.json({ message: "Success!", id: createdType._id });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
