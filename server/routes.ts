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
    { imageUrl: "/images/tournament-1.jpg", caption: "A memorable day on the course", altText: "Tournament highlights" },
    { imageUrl: "/images/tournament-2.jpg", caption: "Team photo at the 18th", altText: "Team photo" },
    { imageUrl: "/images/tournament-3.jpg", caption: "The winning drive", altText: "Golf action" },
    { imageUrl: "/images/tournament-4.jpg", caption: "Celebrating excellence", altText: "Celebration" },
    { imageUrl: "/images/tournament-5.jpg", caption: "Awards ceremony", altText: "Awards" },
    { imageUrl: "/images/tournament-6.jpg", caption: "Starting the day", altText: "Morning start" },
    { imageUrl: "/images/tournament-7.jpg", caption: "In full swing", altText: "Golf swing" },
    { imageUrl: "/images/tournament-8.jpg", caption: "Focused on the perfect putt", altText: "Putting" },
    { imageUrl: "/images/tournament-9.jpg", caption: "A winning moment", altText: "Victory" },
  ];

  for (const img of images) {
    await storage.createGalleryItem(img);
  }
}
