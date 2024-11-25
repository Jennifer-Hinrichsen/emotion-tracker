import dbConnect from "../../../db/connect";
import InitialEmotionEntry from "@/db/models/InitialEmotionEntry";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const initialEmotionEntries = await InitialEmotionEntry.find();
      console.log(initialEmotionEntries);
      response.status(200).json(initialEmotionEntries);
      return;
    }

    if (request.method === "POST") {
      const data = request.body;
      console.log(data);

      await InitialEmotionEntry.create(data);

      response.json({ message: "Success!" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
