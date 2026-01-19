import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Store uploaded images in memory (for development) or public folder
const uploadedImages: Map<string, string> = new Map();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { image } = req.body;
      
      if (!image || typeof image !== "string") {
        res.status(400).json({ error: "No image data provided" });
        return;
      }

      // Generate a unique ID for this image
      const id = crypto.randomBytes(8).toString("hex");
      
      // Store the base64 image in memory
      uploadedImages.set(id, image);
      
      // Return the URL to access this image
      const imageUrl = `/api/upload?id=${id}`;
      
      res.status(200).json({ url: imageUrl, id });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    
    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "No image ID provided" });
      return;
    }
    
    const image = uploadedImages.get(id);
    
    if (!image) {
      res.status(404).json({ error: "Image not found" });
      return;
    }
    
    // Parse the base64 data URL
    const matches = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      res.status(400).json({ error: "Invalid image format" });
      return;
    }
    
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");
    
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(buffer);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
