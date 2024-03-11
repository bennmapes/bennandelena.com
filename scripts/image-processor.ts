const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imagesDir = "./src/assets/photos";
const output = [];

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Error reading images directory", err);
    return;
  }

  let processed = 0;
  files.forEach((file) => {
    sharp(path.join(imagesDir, file))
      .metadata()
      .then((metadata) => {
        output.push({
          src: `/src/assets/photos/${file}`,
          alt: "Camp Photo",
          width: metadata.width,
          height: metadata.height,
        });
        processed++;
        if (processed === files.length) {
          fs.writeFileSync(
            "./src/assets/photos/imagesWithDimensions.json",
            JSON.stringify(output)
          );
        }
      })
      .catch(console.error);
  });
});
