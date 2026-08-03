import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type GalleryItemResponse } from "@shared/routes";
import { insertGalleryItemSchema } from "@shared/schema";
import { z } from "zod";

export function useGalleryItems() {
  return useQuery<GalleryItemResponse>({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.gallery.list.path);
        if (!res.ok) return [];
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return [];
        return api.gallery.list.responses[200].parse(await res.json());
      } catch {
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

type CreateGalleryItemInput = z.infer<typeof insertGalleryItemSchema>;

export function useCreateGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateGalleryItemInput) => {
      const res = await fetch(api.gallery.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.gallery.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create gallery item");
      }

      return api.gallery.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.gallery.list.path] });
    },
  });
}

export function useUploadGalleryPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, adminKey }: { formData: FormData; adminKey: string }) => {
      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Upload failed" }));
        throw new Error(err.message || "Upload failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.gallery.list.path] });
    },
  });
}
