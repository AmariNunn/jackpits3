import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  year: integer("year").notNull().default(2025),
  category: text("category"),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({ id: true });

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
