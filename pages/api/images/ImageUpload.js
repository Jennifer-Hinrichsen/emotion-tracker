import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(request, response) {
  if (request.method === "POST") {
    const { file } = request.body; // erwarte die Bilddatei oder URL
    try {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: "emotion-tracker", // Optional: Ordnerstruktur
      });
      response.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      response.status(500).json({ error: "Upload failed", details: error });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
