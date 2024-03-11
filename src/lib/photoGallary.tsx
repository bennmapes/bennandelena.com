import Gallery from "react-photo-gallery";
import { imageData } from "./photoCarousel";

export function PhotoGallary() {
  // Define the predefined height to which you want to scale all images
  const predefinedHeight = 200;
  // Function to calculate new width while maintaining aspect ratio
  const calculateScaledWidth = (
    originalWidth: number,
    originalHeight: number,
    targetHeight: number
  ) => {
    return (targetHeight / originalHeight) * originalWidth;
  };
  // Populate the `images` array using the data from the JSON file
  const images = imageData.map((image) => {
    const scaledWidth = calculateScaledWidth(
      image.width,
      image.height,
      predefinedHeight
    );
    return {
      src: image.src,
      width: Math.round(scaledWidth), // Round the width to avoid fractional pixels
      height: predefinedHeight,
    };
  });
  return (
    <div>
      <Gallery photos={images} />
    </div>
  );
}
