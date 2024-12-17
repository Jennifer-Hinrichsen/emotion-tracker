import cloudinary from "cloudinary";
import EmotionEntry from "@/db/models/emotionEntry";
import dbConnect from "@/db/connect";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }
  await dbConnect();

  const { id } = request.query;
  const form = formidable({});

  const [fields, files] = await form.parse(request);
  const file = files.image[0];
  const { newFilename, filepath } = file;

  const result = await cloudinary.v2.uploader.upload(filepath, {
    public_id: newFilename,
    folder: "moodwave_uploads",
  });

  await EmotionEntry.findByIdAndUpdate(id, {
    imageUrl: result.secure_url,
  });
  response.status(200).json({ status: "image uploaded!" });
}
