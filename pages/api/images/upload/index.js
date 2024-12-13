// import { v2 as cloudinary } from "cloudinary";

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: "dd2rnrfjz",
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();

import formidable from "formidable";
import cloudinary from "cloudinary";

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

  const form = formidable({});

  const [fields, files] = await form.parse(request);

  const file = files.image[0];
  const { newFilename, filepath } = file;

  const result = await cloudinary.v2.uploader.upload(filepath, {
    public_id: newFilename,
    folder: "nf",
  });

  response.status(200).json(result);
}
