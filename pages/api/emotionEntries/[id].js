import EmotionEntry from "@/db/models/emotionEntry";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
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
  }

  if (request.method === "PUT") {
    const emotionData = request.body;
    try {
      await EmotionEntry.findByIdAndUpdate(id, emotionData);
      return response.status(200).json({ status: `Emotion ${id} updated!` });
    } catch (error) {
      console.error("Error updating emotion entry:", error);
      response.status(500).json({ status: "Server Error" });
    }
  }

  if (request.method === "PATCH") {
    const { imageUrl } = request.body;

    try {
      // Nur das imageUrl aktualisieren
      const updatedEmotionEntry = await EmotionEntry.findByIdAndUpdate(
        id,
        { imageUrl }, // Nur das imageUrl-Feld wird geändert
        { new: true } // Gibt das aktualisierte Dokument zurück
      );

      if (!updatedEmotionEntry) {
        return response.status(404).json({ status: "Emotion Entry Not Found" });
      }

      response.status(200).json(updatedEmotionEntry);
    } catch (error) {
      console.error("Error updating image URL:", error);
      response.status(500).json({ status: "Server Error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      await EmotionEntry.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Emotion ${id} successfully deleted.` });
    } catch (error) {
      console.error("Error deleting emotion entry:", error);
      response.status(500).json({ status: "Server Error" });
    }
  }
}
