import dbConnect from "../../../db/connect";
import initialEmotionEntry from "@/db/models/initial-emotion-entries";
export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const initialEmotionEntries = await initialEmotionEntry.find();
      response.status(200).json(initialEmotionEntries);
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
    return;
  }
}
