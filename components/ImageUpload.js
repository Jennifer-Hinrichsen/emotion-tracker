import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

export default function ImageUpload() {
  const cld = new Cloudinary({ cloud: { cloudName: "dd2rnrfjz" } });

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("e9llkelep2tyo3eayqhv")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(100).height(100)); // Transform the image: auto-crop to square aspect_ratio
  return <AdvancedImage cldImg={img} />;
}
