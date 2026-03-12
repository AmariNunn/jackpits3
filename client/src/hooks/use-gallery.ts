import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { insertGalleryItemSchema } from "@shared/schema";
import { z } from "zod";

export function useGalleryItems() {
  return useQuery({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      const res = await fetch(api.gallery.list.path);
      if (!res.ok) throw new Error("Failed to fetch gallery items");
      return api.gallery.list.responses[200].parse(await res.json());
    },
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
          // Parse specific validation error from backend
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
