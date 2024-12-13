// import React from "react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";

// export default function ImageUpload() {
//   const cld = new Cloudinary({ cloud: { cloudName: "dd2rnrfjz" } });

//   // Use this sample image or upload your own via the Media Explorer
//   const img = cld
//     .image("e9llkelep2tyo3eayqhv")
//     .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
//     .quality("auto")
//     .resize(auto().gravity(autoGravity()).width(100).height(100)); // Transform the image: auto-crop to square aspect_ratio
//   return <AdvancedImage cldImg={img} />;
// }

export default function ImageUpload() {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget; // Sicherstellen, dass das <form>-Element referenziert wird
    const formData = new FormData(form); // Erzeuge ein FormData-Objekt mit dem Formular

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Upload erfolgreich!");
      } else {
        console.error("Upload fehlgeschlagen:", await response.text());
      }
    } catch (error) {
      console.error("Fehler beim Upload:", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image">Bild hochladen:</label>
      <input type="file" id="image" name="image" accept="image/*" required />
      <button type="submit">Hochladen</button>
    </form>
  );
}
