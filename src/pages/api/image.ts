import { NextApiHandler } from "next";
import { z } from "zod";

import { getLayoutAndConfig } from "../../layouts";
import { renderLayoutToSVG, renderSVGToPNG, renderSVGToWebP } from "../../og";
import { sanitizeHtml } from "../../layouts/utils";

// Increase response size limit for large SVGs with embedded images
export const config = {
  api: {
    responseLimit: false,
  },
};

const imageReq = z.object({
  layoutName: z.string(),
  fileType: z.enum(["svg", "png", "webp"]).nullish(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const { layoutName, fileType } = await imageReq.parseAsync(req.query);

    const { layout, config } = await getLayoutAndConfig(
      layoutName.toLowerCase(),
      req.query,
    );
    const svg = await renderLayoutToSVG({ layout, config });

    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      fileType === "svg" ? "image/svg+xml" : `image/${fileType}`,
    );
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );

    if (fileType === "png") {
      const png = await renderSVGToPNG(svg);
      res.end(png);
    } else if (fileType === "webp") {
      const webp = await renderSVGToWebP(svg);
      res.end(webp);
    } else {
      res.end(svg);
    }
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1>Internal Error</h1><pre><code>${sanitizeHtml(
        (e as any).message,
      )}</code></pre>`,
    );
    console.error(e);
  }
};

export default handler;
