// scripts/convert-images.ts
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const SOURCE_ICON = "./src/assets/logo.png"; // Your source logo
const OUTPUT_DIR = "./public/img/";

const FAVICON_SIZES = [16, 32, 48, 64, 128, 192, 256, 512];

const SOCIAL_PREVIEW_WIDTH = 1200;
const SOCIAL_PREVIEW_HEIGHT = 630;
const SOCIAL_PREVIEW_BGCOLOR = "#ffffff"; // White background

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

    // Generate social preview image (1200x630 is standard for most platforms)
    await generateSocialPreviewImage();

    console.log("Favicon conversion complete!");
  } catch (error) {
    console.error("Error converting favicons:", error);
  }
}

/**
 * Creates a social preview image optimized for sharing on social media platforms
 * The image includes the logo centered on a background with appropriate padding
 */
async function generateSocialPreviewImage() {
  try {
    // Get the dimensions of the source image
    const metadata = await sharp(SOURCE_ICON).metadata();
    const sourceWidth = metadata.width || 512;
    const sourceHeight = metadata.height || 512;

    // Calculate a good size for the logo on the preview image (40% of the height)
    const logoSize = Math.round(SOCIAL_PREVIEW_HEIGHT * 0.4);
    const scaleFactor = logoSize / Math.max(sourceWidth, sourceHeight);
    const logoWidth = Math.round(sourceWidth * scaleFactor);
    const logoHeight = Math.round(sourceHeight * scaleFactor);

    // Position the logo in the center of the canvas
    const leftPosition = Math.round((SOCIAL_PREVIEW_WIDTH - logoWidth) / 2);
    const topPosition = Math.round((SOCIAL_PREVIEW_HEIGHT - logoHeight) / 2);

    // Create a blank canvas with the specified dimensions
    const socialPreview = await sharp({
      create: {
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        channels: 4,
        background: SOCIAL_PREVIEW_BGCOLOR,
      },
    })
      .composite([
        {
          input: await sharp(SOURCE_ICON)
            .resize(logoWidth, logoHeight)
            .toBuffer(),
          left: leftPosition,
          top: topPosition,
        },
      ])
      .png()
      .toFile(path.join(OUTPUT_DIR, "social-preview.png"));

    console.log("✓ Generated social-preview.png");
    return socialPreview;
  } catch (error) {
    console.error("Error generating social preview image:", error);
  }
}

convertFavicons();
