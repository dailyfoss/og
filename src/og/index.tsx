import { ILayout, ILayoutConfig } from "../layouts/types";
import satori from "satori";
import { Resvg, ResvgRenderOptions } from "@resvg/resvg-js";
import sharp from "sharp";
import fs from "fs";
import { SatoriOptions } from "satori";
import { OG_HEIGHT, OG_WIDTH } from "../constants";

const fonts: SatoriOptions["fonts"] = [
  {
    name: "Inter",
    style: "normal",
    weight: 400,
    data: fs.readFileSync("public/fonts/Inter-Regular.ttf"),
  },
  {
    name: "Inter",
    style: "bold" as any,
    weight: 800,
    data: fs.readFileSync("public/fonts/Inter-Bold.ttf"),
  },
];

export const renderLayoutToSVG = async ({
  layout,
  config,
}: {
  layout: ILayout;
  config: ILayoutConfig;
}) => {
  const Component = layout.Component;

  const svg = await satori(<Component config={config} />, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  return svg;
};

const resvgOpts: ResvgRenderOptions = {
  fitTo: {
    mode: "width",
    value: OG_WIDTH,
  },
  shapeRendering: 2, // optimizeSpeed
  textRendering: 2, // optimizeLegibility
  imageRendering: 0, // optimizeQuality
};

// Higher resolution for better quality raster images
const resvgOptsHighRes: ResvgRenderOptions = {
  fitTo: {
    mode: "width",
    value: OG_WIDTH * 2, // 2x resolution for better quality
  },
  shapeRendering: 2,
  textRendering: 2,
  imageRendering: 0,
};

export const renderSVGToPNG = async (svg: string) => {
  const resvg = new Resvg(svg, resvgOptsHighRes);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // Resize back to original dimensions with high quality
  const optimizedPng = await sharp(pngBuffer)
    .resize(OG_WIDTH, OG_HEIGHT, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
    })
    .png({
      quality: 100,
      compressionLevel: 6,
    })
    .toBuffer();

  return optimizedPng;
};

export const renderSVGToWebP = async (svg: string) => {
  const resvg = new Resvg(svg, resvgOptsHighRes);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // Convert to WebP with aggressive compression for smaller file size
  // Quality 75 provides good visual quality while reducing file size significantly
  const webpBuffer = await sharp(pngBuffer)
    .resize(OG_WIDTH, OG_HEIGHT, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
    })
    .webp({
      quality: 75,           // Reduced for smaller files (still good quality)
      alphaQuality: 100,
      lossless: false,
      nearLossless: false,
      smartSubsample: true,
      effort: 6,             // Maximum compression effort
    })
    .toBuffer();

  return webpBuffer;
};
