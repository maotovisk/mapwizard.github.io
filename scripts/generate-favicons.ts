// scripts/convert-images.ts
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const SOURCE_ICON = "./src/assets/logo.png"; // Your source logo
const OUTPUT_DIR = "./public/img/";

const FAVICON_SIZES = [16, 32, 48, 64, 128, 192, 256, 512];

async function convertFavicons() {
  console.log("Converting favicons...");

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generate PNG favicons in different sizes
    for (const size of FAVICON_SIZES) {
      await sharp(SOURCE_ICON)
        .resize(size, size)
        .png()
        .toFile(path.join(OUTPUT_DIR, `favicon-${size}x${size}.png`));

      console.log(`✓ Generated favicon-${size}x${size}.png`);
    }

    // Generate .ico file (16x16, 32x32)
    const icoSizes = [16, 32];
    const icoBuffers = await Promise.all(
      icoSizes.map((size) =>
        sharp(SOURCE_ICON).resize(size, size).toFormat("png").toBuffer()
      )
    );

    // You'll need to use another library like 'png-to-ico' to combine these buffers
    // into a proper .ico file, or use a simpler approach like:
    await sharp(SOURCE_ICON)
      .resize(32, 32)
      .toFile(path.join(OUTPUT_DIR, "favicon.ico"));

    console.log("✓ Generated favicon.ico");

    // Generate Apple Touch Icon
    await sharp(SOURCE_ICON)
      .resize(180, 180)
      .png()
      .toFile(path.join(OUTPUT_DIR, "apple-touch-icon.png"));

    console.log("✓ Generated apple-touch-icon.png");

    console.log("Favicon conversion complete!");
  } catch (error) {
    console.error("Error converting favicons:", error);
  }
}

convertFavicons();
