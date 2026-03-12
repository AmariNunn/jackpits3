import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
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
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/ce68cb6c-96b9-47c4-a729-ab8b9d70cd52/JP+19.png", altText: "Golf Tournament 19" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/d80c6a17-330a-4d1b-b1db-99794f4b4bac/JP+21.png", altText: "Golf Tournament 21" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/39b447e5-cd2c-4dc2-a425-dde477130182/JP+22.png", altText: "Golf Tournament 22" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/74489cdd-fc92-4750-8273-303a080df72d/JP+23.png", altText: "Golf Tournament 23" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/7e26f78b-3263-4830-8788-5aae9d013882/JP+24.png", altText: "Golf Tournament 24" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/223337d0-9169-4aa1-946f-1d351ea442af/JP9.png", altText: "Golf Tournament 9" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/6ae4a3b1-f5bc-49a6-8767-3fb5f5a21694/JP10.png", altText: "Golf Tournament 10" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/b7293fb0-53a0-439f-b64e-d8587fc76330/JP+7.png", altText: "Golf Tournament 7" },
    { imageUrl: "https://images.squarespace-cdn.com/content/v1/603bc7585646d67cf7bc9822/1617839157093-E69LLCDFIYKEE5RZMTN3/JP+14.png", altText: "Golf Tournament 14" }
  ];

  for (const img of images) {
    await storage.createGalleryItem(img);
  }
}
