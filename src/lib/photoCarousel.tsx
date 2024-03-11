import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { cn } from "./utils";
import photo1 from "/src/assets/photos/photo1.jpg"
import photo2 from "/src/assets/photos/photo2.jpg"
import photo3 from "/src/assets/photos/photo3.jpg"
import photo4 from "/src/assets/photos/photo4.jpg"
import photo5 from "/src/assets/photos/photo5.jpg"
import photo6 from "/src/assets/photos/photo6.jpg"
import photo7 from "/src/assets/photos/photo7.jpg"
import photo8 from "/src/assets/photos/photo8.jpg"
import photo9 from "/src/assets/photos/photo9.jpg"
import photo10 from "/src/assets/photos/photo10.jpg"
import photo11 from "/src/assets/photos/photo11.jpg"
import photo12 from "/src/assets/photos/photo12.jpg"
import photo13 from "/src/assets/photos/photo13.jpg"
import photo14 from "/src/assets/photos/photo14.jpg"
import photo15 from "/src/assets/photos/photo15.jpg"
import photo16 from "/src/assets/photos/photo16.jpg"
import photo17 from "/src/assets/photos/photo17.jpg"
import photo18 from "/src/assets/photos/photo18.jpg"
import photo19 from "/src/assets/photos/photo19.jpg"
import photo20 from "/src/assets/photos/photo20.jpg"
import photo21 from "/src/assets/photos/photo21.jpg"


export const imageData = [
  {
      "src": photo17,
      "alt": "Camp Photo",
      "width": 1440,
      "height": 1440
  },
  {
      "src": photo9,
      "alt": "Camp Photo",
      "width": 803,
      "height": 1024
  },
  {
      "src": photo8,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo11,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo15,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 1836
  },
  {
      "src": photo7,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo5,
      "alt": "Camp Photo",
      "width": 4032,
      "height": 2268
  },
  {
      "src": photo20,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo6,
      "alt": "Camp Photo",
      "width": 4032,
      "height": 3024
  },
  {
      "src": photo19,
      "alt": "Camp Photo",
      "width": 2448,
      "height": 3264
  },
  {
      "src": photo4,
      "alt": "Camp Photo",
      "width": 4032,
      "height": 3024
  },
  {
      "src": photo1,
      "alt": "Camp Photo",
      "width": 3024,
      "height": 4032
  },
  {
      "src": photo3,
      "alt": "Camp Photo",
      "width": 4032,
      "height": 3024
  },
  {
      "src": photo21,
      "alt": "Camp Photo",
      "width": 2448,
      "height": 3264
  },
  {
      "src": photo13,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo14,
      "alt": "Camp Photo",
      "width": 2448,
      "height": 3264
  },
  {
      "src": photo10,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo18,
      "alt": "Camp Photo",
      "width": 2448,
      "height": 3264
  },
  {
      "src": photo16,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 1836
  },
  {
      "src": photo12,
      "alt": "Camp Photo",
      "width": 3264,
      "height": 2448
  },
  {
      "src": photo2,
      "alt": "Camp Photo",
      "width": 3024,
      "height": 4032
  }
]


export function PhotoCarousel({ isDesktop = true, ...props }) {
  // Define the predefined height to which you want to scale all images
  const predefinedHeight = 400;
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
    <div className={cn("w-full flex justify-center  pt-5", isDesktop? " pl-6 pr-6 ": "")} {...props}>
    <Carousel opts={{
        align: "center",
        // containScroll="trimSnaps",
      }}
      orientation={isDesktop? "horizontal" : "vertical"}
      className={cn("w-full", (isDesktop? "" : "max-w-xs"))}>
      <CarouselContent className={cn("h-[450px]", isDesktop? "max-h" : "-mt-1 h-[400px]")}>
        {images.map((imageData, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-2/7">
        
            <div className="flex aspect-square items-center justify-center">
              <img
                src={imageData.src}
                alt="Your alt text"
                width={imageData.width}
                height={imageData.height}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  </div>
  )
}
