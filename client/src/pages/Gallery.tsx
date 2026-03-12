import { PageHeader } from "@/components/PageHeader";
import { useGalleryItems, useCreateGalleryItem } from "@/hooks/use-gallery";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import trophyImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_09_PM_1773071637027.png";
import swingImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_17_PM_1773071637027.png";
import celebrationImg from "@assets/Golfer's_winning_moment_in_anime_style_1773071637027.png";

// Carousel component for slides
function Carousel({ items, title, description }: { items: any[]; title: string; description?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0d1f0f] mb-2">{title}</h2>
        {description && <p className="text-[#0d1f0f]/60 font-body">{description}</p>}
      </div>

      <div className="relative group">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/5 shadow-xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={items[currentIndex].imageUrl}
              alt={items[currentIndex].caption}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`caption-${currentIndex}`}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:p-8"
          >
            <div>
              <p className="text-white font-body text-lg md:text-xl">{items[currentIndex].caption}</p>
              <p className="text-white/60 text-sm mt-2">
                {currentIndex + 1} / {items.length}
              </p>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#1a6b3a] w-8 h-2" : "bg-[#0d1f0f]/20 w-2 h-2"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { data: items, isLoading, error } = useGalleryItems();
  const createItem = useCreateGalleryItem();
  const [isOpen, setIsOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  // Organize items into different carousel groups
  const carouselGroups = useMemo(() => {
    const staticImages = [
      { id: -1, imageUrl: "/images/JP 19.png", caption: "Putting for birdie" },
      { id: -2, imageUrl: "/images/JP 21.png", caption: "Team photo at the 18th" },
      { id: -3, imageUrl: "/images/JP 22.png", caption: "The winning drive" },
      { id: -4, imageUrl: "/images/JP 23.png", caption: "Lunch on the patio" },
      { id: -5, imageUrl: "/images/JP 24.png", caption: "Awards ceremony" },
      { id: -6, imageUrl: "/images/JP9.png", caption: "Starting the day" },
      { id: -7, imageUrl: "/images/JP10.png", caption: "Good times" },
      { id: -8, imageUrl: "/images/JP 7.png", caption: "On the green" },
      { id: -9, imageUrl: "/images/JP 14.png", caption: "Group shot" },
    ];

    const displayItems = items && items.length > 0 ? items : staticImages;

    // Split into groups
    const group1 = displayItems.slice(0, 3);
    const group2 = displayItems.slice(3, 6);
    const group3 = displayItems.slice(6);

    return [
      { title: "Tournament Highlights", description: "Celebrating the best moments", items: group1 },
      { title: "On the Course", description: "Players in action", items: group2 },
      { title: "Community & Celebration", description: "The heart of the event", items: group3 },
    ];
  }, [items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem.mutateAsync({
        imageUrl,
        caption,
        altText: caption
      });
      setIsOpen(false);
      setImageUrl("");
      setCaption("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="relative pt-28 pb-14 md:pt-40 md:pb-28 overflow-hidden bg-[#0d1f0f]">
        <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#f5f0e8] mb-3 md:mb-4"
          >
            Moments That Matter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#f5f0e8]/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-body"
          >
            Capturing the spirit of the Jack Pitts Open through the years.
          </motion.p>
        </div>
      </div>

      <section className="py-12 md:py-20 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-8">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-[#1a6b3a]/20 text-[#1a6b3a] hover:bg-[#1a6b3a]/5" data-testid="button-add-photo">
                  <Plus size={16} /> Add Photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add to Gallery</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Image URL</Label>
                    <Input
                      id="url"
                      placeholder="/images/example.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                      data-testid="input-image-url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Input
                      id="caption"
                      placeholder="Enter a caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      data-testid="input-caption"
                    />
                  </div>
                  <Button type="submit" disabled={createItem.isPending} className="w-full bg-[#1a6b3a] hover:bg-[#1a6b3a]/90" data-testid="button-submit-photo">
                    {createItem.isPending ? "Adding..." : "Add Photo"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-12 h-12 text-[#1a6b3a] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-32 text-destructive font-body text-lg">
              Failed to load gallery. Please try again later.
            </div>
          ) : (
            <div className="space-y-24">
              {carouselGroups.map((group, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Carousel items={group.items} title={group.title} description={group.description} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
