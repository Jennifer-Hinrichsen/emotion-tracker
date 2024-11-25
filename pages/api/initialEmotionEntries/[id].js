import dbConnect from "../../../db/connect";
import InitialEmotionEntry from "@/db/models/InitialEmotionEntry";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const InitialEmotionEntry = await InitialEmotionEntry.findById(id).populate(
      "reviews"
    );

    if (!InitialEmotionEntry) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(InitialEmotionEntry);
  }
}
