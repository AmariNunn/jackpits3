import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import express from "express";

// Uploads are stored at the project root so they survive both dev (no build)
// and production (where the static root is dist/public, not client/public).
// The /uploads route is mounted explicitly below so Express serves them in both modes.
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

const ALLOWED_MIME_PREFIXES = ["image/"];
const ALLOWED_YEARS = new Set([2025, 2026]);
const ALLOWED_CATEGORIES = new Set([
  "Moments to Remember",
  "Fairway Friends",
  "Course Action",
  "Team Spirit",
  "Clubhouse Memories",
  "Lasting Impressions",
  "Teams With Jack",
]);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Serve uploaded photos in both dev and production
  app.use("/uploads", express.static(uploadsDir));

  app.get(api.gallery.list.path, async (req, res) => {
    const items = await storage.getGalleryItems();
    res.json(items);
  });

  app.post(api.gallery.create.path, async (req, res) => {
    try {
      const input = api.gallery.create.input.parse(req.body);
      const item = await storage.createGalleryItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // File upload endpoint — accepts images including HEIC, converts to JPEG via sharp.
  // Protected by an admin key (SESSION_SECRET env var). Pass it as the
  // x-admin-key request header; returns 401 if missing or incorrect.
  app.post("/api/gallery/upload", upload.single("file"), async (req, res) => {
    try {
      // --- Admin key check (server-side enforcement) ---
      const adminKey = process.env.SESSION_SECRET;
      const provided = req.headers["x-admin-key"];
      if (!adminKey || !provided || provided !== adminKey) {
        res.status(401).json({ message: "Unauthorized." });
        return;
      }

      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const { caption, altText, year, category } = req.body as {
        caption?: string;
        altText?: string;
        year?: string;
        category?: string;
      };

      // --- Allow-list validation for year and category ---
      const parsedYear = parseInt(year ?? "2026", 10);
      if (!ALLOWED_YEARS.has(parsedYear)) {
        res.status(400).json({ message: "Invalid year. Must be 2025 or 2026." });
        return;
      }
      if (category && !ALLOWED_CATEGORIES.has(category)) {
        res.status(400).json({ message: "Invalid category." });
        return;
      }

      // --- Validate MIME type — accept any image/* including HEIC which some
      //     clients report as image/heic or image/heif ---
      const mime = file.mimetype || "";
      if (!ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p)) && mime !== "application/octet-stream") {
        res.status(400).json({ message: "Only image files are accepted." });
        return;
      }

      const filename = `${crypto.randomUUID()}.jpg`;
      const outputPath = path.join(uploadsDir, filename);

      // sharp handles HEIC/HEIF and all common image formats; always outputs JPEG
      await sharp(file.buffer).jpeg({ quality: 90 }).toFile(outputPath);

      const imageUrl = `/uploads/${filename}`;
      const item = await storage.createGalleryItem({
        imageUrl,
        altText: altText || caption || "",
        caption: caption || "",
        year: parsedYear,
        category: category || null,
      });

      res.status(201).json(item);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed. Make sure the file is a valid image." });
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getGalleryItems();
  if (existing.length > 0) return;

  const images = [
    { imageUrl: "/images/tournament-1.jpg", caption: "A memorable day on the course", altText: "Tournament highlights", year: 2025, category: null },
    { imageUrl: "/images/tournament-2.jpg", caption: "Team photo at the 18th", altText: "Team photo", year: 2025, category: null },
    { imageUrl: "/images/tournament-3.jpg", caption: "The winning drive", altText: "Golf action", year: 2025, category: null },
    { imageUrl: "/images/tournament-4.jpg", caption: "Celebrating excellence", altText: "Celebration", year: 2025, category: null },
    { imageUrl: "/images/tournament-5.jpg", caption: "Awards ceremony", altText: "Awards", year: 2025, category: null },
    { imageUrl: "/images/tournament-6.jpg", caption: "Starting the day", altText: "Morning start", year: 2025, category: null },
    { imageUrl: "/images/tournament-7.jpg", caption: "In full swing", altText: "Golf swing", year: 2025, category: null },
    { imageUrl: "/images/tournament-8.jpg", caption: "Focused on the perfect putt", altText: "Putting", year: 2025, category: null },
    { imageUrl: "/images/tournament-9.jpg", caption: "A winning moment", altText: "Victory", year: 2025, category: null },
  ];

  for (const img of images) {
    await storage.createGalleryItem(img);
  }
}
